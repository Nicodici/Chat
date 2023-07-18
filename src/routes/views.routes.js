import { Router } from "express";

const router = Router();

router.get("/",(req,res)=>{
    res.render("home") // primer parametro es el nombre de la vista de la pagina, osea home.hbs
});

export {router as viewsRouter}