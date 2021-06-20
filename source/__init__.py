from flask import Flask,request,make_response,jsonify
app=Flask('source')
import jwt, re, json
from functools import wraps

roles={
    "everyone":["in","std"],
    "in_only":["in"],
    "std_only":["std"]
}

token_data={}
def token_authenticator(expected_role=""):
    def inner_decorator(fun):
        @wraps(fun)
        def inner(*args,**kwargs):
            try:
                authorization = request.headers.get("authorization")
                if re.match("^Bearer *([^ ]+) *$",authorization,flags=0):
                    token = authorization.split(" ")[1]
                    decoded = jwt.decode(token,"EncryptionKey",algorithms="HS256")
                    token_data["data"] = decoded["data"][0]
                    if token_data["data"]["role"] in expected_role:
                        return fun(*args,**kwargs)
                    else:
                        return make_response({"Error":"Invalid Role"},403)
                    
                else:
                    return make_response({"Error":"Invalid Token"})
            except Exception as e:
                return make_response({"Error":str(e)},500)
        return inner
    return inner_decorator

from source.controllers import *
