# import uvicorn
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine
from .auth import AuthHandler
from fastapi_login import LoginManager
models.Base.metadata.create_all(bind=engine)


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# @app.post('/register', status_code=201)
# def register(auth_details: schemas.AuthDetails):
#     print(crud.get_user_by_email(email=auth_details.email, db=next(get_db())))
#     if crud.get_user_by_email(email=auth_details.email, db=next(get_db())):
#         raise HTTPException(status_code=400, detail='Email already registered')
#     hashed_password = auth_handler.get_password_hash(auth_details.password)
#     crud.create_user(db=next(get_db()), user=schemas.UserCreate(email=auth_details.email, password=hashed_password))
#     return {'message': 'ok'}

# @app.post('/login')
# def login(auth_details: schemas.AuthDetails):
#     user = crud.get_user_by_email(email=auth_details.email, db=next(get_db()))
#     if not user:
#         raise HTTPException(status_code=401, detail='Invalid password or email')
#     token = auth_handler.encode_token(user.email)
#     return {'token': token}

# @app.get('/unprotected')
# def unprotected():
#     return {'hello': 'world'}

# @app.get('/protected')
# def protected(email=Depends(auth_handler.auth_wrapper)):
#     return {'email': email}


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)


@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items


# if __name__ == '__main__':
#     uvicorn.run(app=app, host='0.0.0.0', port='5000')
    
