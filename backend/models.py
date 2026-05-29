from sqlalchemy import Column,Integer,String,Float
from database import Base

class Resume(Base):

    __tablename__="resumes"

    id=Column(Integer,primary_key=True,index=True)

    candidate_name=Column(String)

    file_path=Column(String)

    score=Column(Float)