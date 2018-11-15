# Router Endpoints for Stock Price Chart
***
## The following end points have been defined for client side and server side usage:

Endpoint   |   Method   |   Description
---   |   ---   |   ---
/pricechart/company   |   POST   |   Add a new company
/pricechart/company/:id   |   GET   |   Retrieve all company information
/pricechart/company/:id   |   PATCH   |   Update company info
/pricechart/company/:id   |   DELETE   |   Delete company info

/pricechart/prices/:id/:day   |   GET   |   Retrieve ALL company prices for the specfic day
/pricechart/prices/:id/:day time   |    GET   |   Retrieve company specific price at time of the day
/pricechart/prices/:id/:day time   |    POST   |   Add a new price
/pricechart/prices/:id/:day time   |   PATCH   |   Update company price at a specufic time of the day
/pricechart/prices/:id/:day time   |   DELETE   |   Delete a company price at a specific time of the day

