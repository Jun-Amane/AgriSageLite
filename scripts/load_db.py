import pandas as pd
from sqlalchemy import create_engine

df = pd.read_csv('../database/wheat.csv', encoding='gbk', header=None, names=['cn_name', 'key', 'desc', 'prev', 'src_url'])

engine = create_engine('mysql://jun-amane:stochastic@localhost/agri_sage_lite')

df.to_sql('wheat', con=engine, if_exists='replace', index=False)

pass

