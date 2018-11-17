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
    company_Id integer, 
    FOREIGN KEY (company_Id) 
    REFERENCES pricedata.company (companyid) 
);
