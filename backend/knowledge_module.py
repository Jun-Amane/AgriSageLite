from sqlalchemy import create_engine, Column, String, Text
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import contextmanager

Base = declarative_base()


class Birds(Base):
    __tablename__ = 'birds'
    key = Column(String(255), primary_key=True)
    desc = Column(Text)


class Flowers(Base):
    __tablename__ = 'flowers'
    key = Column(String(255), primary_key=True)
    desc = Column(Text)


class Wheat(Base):
    __tablename__ = 'wheat'
    key = Column(String(255), primary_key=True)
    desc = Column(Text)
    prev = Column(Text)


class KnowledgeModule:
    def __init__(self):
        db_url = "mysql+pymysql://jun-amane:stochastic@localhost/agri_sage_lite"
        self.engine = create_engine(db_url)
        self.Session = sessionmaker(bind=self.engine)

    @contextmanager
    def session_scope(self):
        session = self.Session()
        try:
            yield session
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()

    def get_knowledge(self, category, type_name):
        with self.session_scope() as session:
            if category == "bird":
                result = session.query(Birds).filter(Birds.key == type_name).first()
                if result:
                    return {"简介": result.desc}
            elif category == "flower":
                result = session.query(Flowers).filter(Flowers.key == type_name).first()
                if result:
                    return {"简介": result.desc}
            elif category == "disease":
                result = session.query(Wheat).filter(Wheat.key == type_name).first()
                if result:
                    return {"简介": result.desc, "防治措施": result.prev}
            else:
                return {"error": "Invalid category"}

            return {"error": "No specific knowledge found for this category and type."}


# Example usage
if __name__ == "__main__":
    km = KnowledgeModule()
    print(km.get_knowledge("wheat", "Wheat Loose Smut"))
