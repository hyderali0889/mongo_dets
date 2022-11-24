const advancedResult = ( model , populate ) => async ( req , res , next ) =>{


    /*
        8b    d8    db    88 88b 88      dP"Yb  88   88 888888 88""Yb Yb  dP     888888  dP"Yb      888888 Yb  dP 888888  dP""b8 88   88 888888 888888
        88b  d88   dPYb   88 88Yb88     dP   Yb 88   88 88__   88__dP  YbdP        88   dP   Yb     88__    YbdP  88__   dP   `" 88   88   88   88__
        88YbdP88  dP__Yb  88 88 Y88     Yb b dP Y8   8P 88""   88"Yb    8P         88   Yb   dP     88""    dPYb  88""   Yb      Y8   8P   88   88""
        88 YY 88 dP""""Yb 88 88  Y8      `"YoYo `YbodP' 888888 88  Yb  dP          88    YbodP      888888 dP  Yb 888888  YboodP `YbodP'   88   888888
*/  let query;

/*
           db    8888b.  8888b.  88 88b 88  dP""b8     88""Yb 888888  dP"Yb       dP"Yb  88   88 888888 88""Yb Yb  dP     888888  dP"Yb         db    88b 88      dP"Yb  88""Yb  88888 888888  dP""b8 888888
          dPYb    8I  Yb  8I  Yb 88 88Yb88 dP   `"     88__dP 88__   dP   Yb     dP   Yb 88   88 88__   88__dP  YbdP        88   dP   Yb       dPYb   88Yb88     dP   Yb 88__dP     88 88__   dP   `"   88
         dP__Yb   8I  dY  8I  dY 88 88 Y88 Yb  "88     88"Yb  88""   Yb b dP .o. Yb b dP Y8   8P 88""   88"Yb    8P         88   Yb   dP      dP__Yb  88 Y88     Yb   dP 88""Yb o.  88 88""   Yb        88
        dP""""Yb 8888Y"  8888Y"  88 88  Y8  YboodP     88  Yb 888888  `"YoYo `"'  `"YoYo `YbodP' 888888 88  Yb  dP          88    YbodP      dP""""Yb 88  Y8      YbodP  88oodP "bodP' 888888  YboodP   88
*/  let reqQuery = { ...req.query };

/*
           db    8888b.  8888b.  88 88b 88  dP""b8     .dPIIY8     888888  dP"Yb       dP""b8 888888
          dPYb    8I  Yb  8I  Yb 88 88Yb88 dP   `"     `YbII "       88   dP   Yb     dP   `"   88
         dP__Yb   8I  dY  8I  dY 88 88 Y88 Yb  "88     o.`II8b       88   Yb   dP     Yb  "88   88
        dP""""Yb 8888Y"  8888Y"  88 88  Y8  YboodP     8boIIP'       88    YbodP       YboodP   88
*/  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

/*
        88""Yb    db    88""Yb .dP"Y8 88 88b 88  dP""b8     888888  dP"Yb       88888 .dP"Y8  dP"Yb  88b 88
        88__dP   dPYb   88__dP `Ybo." 88 88Yb88 dP   `"       88   dP   Yb         88 `Ybo." dP   Yb 88Yb88
        88"""   dP__Yb  88"Yb  o.`Y8b 88 88 Y88 Yb  "88       88   Yb   dP     o.  88 o.`Y8b Yb   dP 88 Y88
        88     dP""""Yb 88  Yb 8bodP' 88 88  Y8  YboodP       88    YbodP      "bodP' 8bodP'  YbodP  88  Y8
*/  query = model.find(JSON.parse(queryStr));




  /*
 ! .dP"Y8 888888 88     888888  dP""b8 888888     .dP"Y8 888888    db    888888 888888 8b    d8 888888 88b 88 888888
 ! `Ybo." 88__   88     88__   dP   `"   88       `Ybo."   88     dPYb     88   88__   88b  d88 88__   88Yb88   88
 ! o.`Y8b 88""   88  .o 88""   Yb        88       o.`Y8b   88    dP__Yb    88   88""   88YbdP88 88""   88 Y88   88
 ! 8bodP' 888888 88ood8 888888  YboodP   88       8bodP'   88   dP""""Yb   88   888888 88 YY 88 888888 88  Y8   88
  */
  if (req.query.select) {
    let selecting = req.query.select.split(",").join(" ");
    query = query.select(selecting);
  }


/*
 *       .dP"Y8  dP"Yb  88""Yb 888888 88 88b 88  dP""b8
 *       `Ybo." dP   Yb 88__dP   88   88 88Yb88 dP   `"
 *       o.`Y8b Yb   dP 88"Yb    88   88 88 Y88 Yb  "88
 *       8bodP'  YbodP  88  Yb   88   88 88  Y8  YboodP
*/


  if (req.query.sort) {
    let sorting = req.query.sort.split(",").join(" ");
    query = query.sort(sorting);
  } else {
    query = query.sort("-createdAt");
  }



/*
 <<         db    8888b.  8888b.  88 88b 88  dP""b8     88""Yb    db     dP""b8 88 88b 88    db    888888 88  dP"Yb  88b 88
 <<        dPYb    8I  Yb  8I  Yb 88 88Yb88 dP   `"     88__dP   dPYb   dP   `" 88 88Yb88   dPYb     88   88 dP   Yb 88Yb88
 <<       dP__Yb   8I  dY  8I  dY 88 88 Y88 Yb  "88     88"""   dP__Yb  Yb  "88 88 88 Y88  dP__Yb    88   88 Yb   dP 88 Y88
 <<      dP""""Yb 8888Y"  8888Y"  88 88  Y8  YboodP     88     dP""""Yb  YboodP 88 88  Y8 dP""""Yb   88   88  YbodP  88  Y8
*/  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);

  if( populate ){
    query = query.populate( populate )
   }

/*
 !      888888 Yb  dP 888888  dP""b8 88   88 888888 88 88b 88  dP""b8      dP"Yb  88   88 888888 88""Yb Yb  dP
 !      88__    YbdP  88__   dP   `" 88   88   88   88 88Yb88 dP   `"     dP   Yb 88   88 88__   88__dP  YbdP
 !      88""    dPYb  88""   Yb      Y8   8P   88   88 88 Y88 Yb  "88     Yb b dP Y8   8P 88""   88"Yb    8P
 !      888888 dP  Yb 888888  YboodP `YbodP'   88   88 88  Y8  YboodP      `"YoYo `YbodP' 888888 88  Yb  dP
*/  const results = await query;

/*
  ?          88""Yb    db     dP""b8 88 88b 88    db    888888 88  dP"Yb  88b 88     88""Yb 888888 .dP"Y8 88   88 88     888888 .dP"Y8
  ?          88__dP   dPYb   dP   `" 88 88Yb88   dPYb     88   88 dP   Yb 88Yb88     88__dP 88__   `Ybo." 88   88 88       88   `Ybo."
  ?          88"""   dP__Yb  Yb  "88 88 88 Y88  dP__Yb    88   88 Yb   dP 88 Y88     88"Yb  88""   o.`Y8b Y8   8P 88  .o   88   o.`Y8b
  ?          88     dP""""Yb  YboodP 88 88  Y8 dP""""Yb   88   88  YbodP  88  Y8     88  Yb 888888 8bodP' `YbodP' 88ood8   88   8bodP'
*/  const pagination = {};

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  if (endIndex < totalPages) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  res.advancedResult = {
    success : true,
    length : results.length,
    pagination,
    data:results
   }

   next();
 }


 module.exports =  advancedResult;