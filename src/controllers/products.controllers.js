import { ProductCtrlr } from '.';
import { Product } from '../models';

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body;

    const existsProduct = await Product.findOne({ name });

    console.log(existsProduct);

    if (existsProduct) return res.status(200).json({msg: 'Product already exists'});

    const newProduct = new Product({
        name,
        category,
        price,
        imgURL,
        last_upd_by: req.uid
    });

    const product = await newProduct.save();

    res.status(201).json({ data: { product }, msg: 'Product successfully created' });
}

export const getProducts = async (req, res) => {
    const products = await Product.find({ deleted: false });

    res.json({ data: { products }, total: products.length });
}

export const getProductById = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findOne({ _id: productId, deleted: false });

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.json({ data: { product } });
}

export const updateProductById = async (req, res) => {
    const { productId } = req.params;

    const existsProduct = await Product.findById(productId);

    if (!existsProduct) return res.status(404).json({ msg: 'Product not found' });

    const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true
    });

    product.last_upd_by = re.uid;
    
    await product.save();
    
    res.status(200).json({ data: { product } });
}

export const deleteProductById = async (req, res) => {
    const { productId } = req.params;

    const existsProduct = await Product.findById(productId);

    if (!existsProduct) return res.status(404).json({ msg: 'Product not found' });

    existsProduct.deleted = true;
    
    const product = await existsProduct.save();

    res.status(200).json({ data: { product }, msg: 'Product successfully deleted' });
}
