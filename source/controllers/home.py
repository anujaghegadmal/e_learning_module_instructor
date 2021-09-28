from source import app, token_authenticator, token_data, roles
from flask import request, make_response, send_file
from flask_cors import CORS,cross_origin
import os
import time

@app.route("/")
@cross_origin()
def add_course():
    try:
        return send_file(app.root_path+"/static/index.html")
        # send_file("index.html")
        
    except Exception as e:
        return make_response({"Error":str(e)},500)

@app.route("/assets",defaults={"path":''})
@app.route("/assets/<path:path>")
@cross_origin()
def asset_handler(path):
    try:
        return send_file(app.root_path+"/assets/"+path)
        
    except Exception as e:
        return make_response({"Error":str(e)},500)

@app.route("/",defaults={"path":''})
@app.route("/<path:path>")
@cross_origin()
def file_handler(path):
    try:
        return send_file(app.root_path+"/static/index.html")
        
    except Exception as e:
        return make_response({"Error":str(e)},500)

@app.route("/login")
def login_in():
    try:
        return send_file(app.root_path+"/static/login_in.html")
        
    except Exception as e:
        return make_response({"Error":str(e)},500)

@app.route("/register")
def register():
    try:
        return send_file(app.root_path+"/static/register.html")
        
    except Exception as e:
        return make_response({"Error":str(e)},500)

@app.route("/forget_password")
def forget_password():
    try:
        return send_file(app.root_path+"/static/forget_password.html")
        
    except Exception as e:
        return make_response({"Error":str(e)},500)
