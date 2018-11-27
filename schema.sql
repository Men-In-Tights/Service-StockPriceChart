CREATE DATABASE IF NOT EXISTS pricedata;

CREATE SCHEMA IF NOT EXISTS pricedata;

CREATE TABLE pricedata.company (
    companyid SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL, 
    owner integer DEFAULT 0,
    rating integer DEFAULT 0,  
);

CREATE TABLE pricedata.prices ( 
    priceid SERIAL PRIMARY KEY, 
    price numeric, 
    datetime timestamp, 
    company_id integer, 
    FOREIGN KEY (company_Id) 
    REFERENCES pricedata.company (companyid) 
);

CREATE INDEX findcompanyinfo
    ON pricedata.company USING btree
    (name COLLATE pg_catalog."default", owner, rating)
    TABLESPACE pg_default;

CREATE INDEX findcompanybyname
    ON pricedata.company USING btree
    (name COLLATE pg_catalog."default" varchar_pattern_ops)
    TABLESPACE pg_default;

CREATE INDEX finddayprices
    ON pricedata.prices USING btree
    (company_id)
    TABLESPACE pg_default;
