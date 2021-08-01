const Product = require("../models/product")
const slugify = require("slugify")

exports.create = async(req,res)=>{
    try{
        // console.log(req.body);
        req.body.slug=slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    }
    catch(err){
        console.log(err);
        // res.status(400).send("create product failed")
        res.status(400).json({
            err:err.message,
        })
    }
};

exports.listAll = async(req,res)=>{
   let products=await Product.find({})
   .limit(parseInt(req.params.count))
   .populate("category")
   .sort([["createdAt","desc"]])
   .exec();
   res.json(products);
}

exports.remove = async (req, res) => {

    try{

        const deleted = await Product.findOneAndRemove({
            slug: req.params.slug
        }).exec();
        res.json(deleted);

    }
    catch(err){

        console.log(err);
        return res.status(400).send("product delete failed");

    }
    
}

exports.read=async(req,res)=>{

    const product = await Product.findOne({slug: req.params.slug})
    .populate("category")
    .exec();
    res.json(product);
}

exports.update=async(req,res)=>{

    try{

        if(req.body.title){
         req.body.slug = slugify(req.body.title);
        }

        const updated =await Product.findOneAndUpdate({slug:req.params.slug},req.body,{new:true}).exec();
        res.json(updated);

    }
    catch(err){

        console.log("PRODUCT UPDATE ERROR --------->",err)

        // return res.status(400).send("Product Update Failed")

        res.status(400).json({
            err:err.message,
        })

    }
}

exports.list= async (req,res) =>{
    try{
        const {sort, order, page} = req.body;

        const CurrentPage = page || 1
        const perPage = 4

        const products = await Product.find({})
        .skip((CurrentPage -1) * perPage)
        .populate('category')
        .sort([[sort,order]])
        .limit(perPage)
        .exec();

    res.json(products);

    } catch(err){
        console.log(err);
    }
} 

exports.productsCount = async (req,res) =>
{
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
};


//filters

 const handleQuery = async (req,res,query) =>{
    const products = await Product.find({ $text: { $search: query}})
    .populate("category", "_id name")
    .populate("postedBy", "_id name")
    .exec();

    res.json(products);
}

exports.searchFilters = async (req,res) =>{
  const {query} = req.body;

  if(query){
      console.log("query",query)
      await handleQuery(req, res, query)
  }
};