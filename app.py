from __future__ import annotations
import json, os
from pathlib import Path
from uuid import uuid4
from datetime import datetime
from flask import Flask, jsonify, render_template, request, send_from_directory, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

BASE_DIR=Path(__file__).resolve().parent
DATA_DIR=BASE_DIR/'data'; UPLOAD_DIR=BASE_DIR/'static'/'uploads'
ALLOWED_EXTENSIONS={'png','jpg','jpeg','webp','svg','gif','json'}
app=Flask(__name__)
app.config.update(SECRET_KEY=os.environ.get('SECRET_KEY','change-this-in-production'),SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL',f"sqlite:///{DATA_DIR/'studio.db'}"),SQLALCHEMY_TRACK_MODIFICATIONS=False,MAX_CONTENT_LENGTH=25*1024*1024)
DATA_DIR.mkdir(exist_ok=True); UPLOAD_DIR.mkdir(parents=True,exist_ok=True)
db=SQLAlchemy(app); login_manager=LoginManager(app); login_manager.login_view='login'

class User(UserMixin,db.Model):
 id=db.Column(db.Integer,primary_key=True); username=db.Column(db.String(80),unique=True,nullable=False); name=db.Column(db.String(120),nullable=False); password_hash=db.Column(db.String(255),nullable=False); role=db.Column(db.String(20),default='user'); active=db.Column(db.Boolean,default=True)
 def set_password(self,p): self.password_hash=generate_password_hash(p)
 def check_password(self,p): return check_password_hash(self.password_hash,p)
class Presentation(db.Model):
 id=db.Column(db.Integer,primary_key=True); user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False); title=db.Column(db.String(160),default='Untitled'); payload=db.Column(db.Text,nullable=False); updated_at=db.Column(db.DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)
class MyTemplate(db.Model):
 id=db.Column(db.Integer,primary_key=True); user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False); name=db.Column(db.String(160),nullable=False); category=db.Column(db.String(80),default='My Templates'); source=db.Column(db.String(40),default='marketplace'); payload=db.Column(db.Text,nullable=False); created_at=db.Column(db.DateTime,default=datetime.utcnow)

@login_manager.user_loader
def load_user(uid): return db.session.get(User,int(uid))

def default_presentation():
 return {'title':'Shared Services Presentation','theme':{'fontFamily':'Arial','accent':'#22d3ee'},'slides':[{'id':str(uuid4()),'name':'Shared Services Operating Model','background':{'type':'color','value':'#061426'},'elements':[{'id':str(uuid4()),'type':'image','src':'/static/uploads/shared_services_reference.png','x':0,'y':0,'w':100,'h':100,'fit':'contain','locked':True}]}]}

def ensure_seed():
 db.create_all()
 if not User.query.filter_by(username='admin').first():
  a=User(username='admin',name='Studio Administrator',role='admin'); a.set_password(os.environ.get('ADMIN_PASSWORD','Admin@123')); db.session.add(a)
 if not User.query.filter_by(username='manager').first():
  u=User(username='manager',name='Manager User',role='user'); u.set_password(os.environ.get('USER_PASSWORD','User@123')); db.session.add(u)
 db.session.commit()
with app.app_context(): ensure_seed()

@app.route('/login',methods=['GET','POST'])
def login():
 if current_user.is_authenticated:return redirect(url_for('index'))
 if request.method=='POST':
  u=User.query.filter_by(username=request.form.get('username','').strip()).first()
  if u and u.active and u.check_password(request.form.get('password','')):
   login_user(u,remember=bool(request.form.get('remember'))); return redirect(request.args.get('next') or url_for('index'))
  flash('Incorrect username or password.','error')
 return render_template('login.html')
@app.get('/logout')
@login_required
def logout(): logout_user(); return redirect(url_for('login'))
@app.get('/')
@login_required
def index(): return render_template('index.html',user=current_user)
@app.get('/admin')
@login_required
def admin():
 if current_user.role!='admin': return redirect(url_for('index'))
 return render_template('admin.html',users=User.query.order_by(User.name).all(),template_count=MyTemplate.query.count(),presentation_count=Presentation.query.count())
@app.post('/admin/users')
@login_required
def add_user():
 if current_user.role!='admin': return jsonify({'error':'Forbidden'}),403
 data=request.form; username=data.get('username','').strip()
 if not username or User.query.filter_by(username=username).first(): flash('Username is missing or already exists.','error'); return redirect(url_for('admin'))
 u=User(username=username,name=data.get('name') or username,role=data.get('role','user')); u.set_password(data.get('password') or 'Welcome@123'); db.session.add(u); db.session.commit(); flash('User created.','success'); return redirect(url_for('admin'))
@app.post('/admin/users/<int:uid>/toggle')
@login_required
def toggle_user(uid):
 if current_user.role!='admin' or uid==current_user.id:return redirect(url_for('admin'))
 u=db.session.get(User,uid); u.active=not u.active; db.session.commit(); return redirect(url_for('admin'))

@app.get('/api/presentation')
@login_required
def get_presentation():
 p=Presentation.query.filter_by(user_id=current_user.id).order_by(Presentation.updated_at.desc()).first(); return jsonify(json.loads(p.payload) if p else default_presentation())
@app.post('/api/presentation')
@login_required
def save_presentation():
 payload=request.get_json(silent=True)
 if not isinstance(payload,dict) or not isinstance(payload.get('slides'),list):return jsonify({'ok':False,'error':'Invalid data'}),400
 p=Presentation.query.filter_by(user_id=current_user.id).order_by(Presentation.updated_at.desc()).first()
 if not p:p=Presentation(user_id=current_user.id,payload='{}');db.session.add(p)
 p.title=payload.get('title','Untitled');p.payload=json.dumps(payload);db.session.commit();return jsonify({'ok':True})
@app.post('/api/reset')
@login_required
def reset(): return jsonify(default_presentation())
@app.get('/api/my-templates')
@login_required
def my_templates(): return jsonify([{'id':t.id,'name':t.name,'category':t.category,'source':t.source,'payload':json.loads(t.payload)} for t in MyTemplate.query.filter_by(user_id=current_user.id).order_by(MyTemplate.created_at.desc()).all()])
@app.post('/api/my-templates')
@login_required
def import_template():
 d=request.get_json(silent=True) or {}; payload=d.get('payload')
 if not isinstance(payload,dict): return jsonify({'ok':False,'error':'Invalid template'}),400
 t=MyTemplate(user_id=current_user.id,name=d.get('name','Imported Template'),category=d.get('category','My Templates'),source=d.get('source','marketplace'),payload=json.dumps(payload));db.session.add(t);db.session.commit();return jsonify({'ok':True,'id':t.id})
@app.delete('/api/my-templates/<int:tid>')
@login_required
def delete_template(tid):
 t=MyTemplate.query.filter_by(id=tid,user_id=current_user.id).first_or_404();db.session.delete(t);db.session.commit();return jsonify({'ok':True})

def allowed(n):return '.' in n and n.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS
@app.post('/api/upload')
@login_required
def upload_asset():
 f=request.files.get('file')
 if not f or not f.filename or not allowed(f.filename):return jsonify({'ok':False,'error':'Unsupported file'}),400
 clean=secure_filename(f.filename);filename=f"{Path(clean).stem[:50] or 'asset'}_{uuid4().hex[:8]}{Path(clean).suffix.lower()}";f.save(UPLOAD_DIR/filename);return jsonify({'ok':True,'url':f'/static/uploads/{filename}','name':filename})
@app.get('/health')
def health():return jsonify({'status':'ok'})

if __name__=='__main__':app.run(host='0.0.0.0',port=int(os.environ.get('PORT',5000)),debug=os.environ.get('FLASK_DEBUG')=='1')
