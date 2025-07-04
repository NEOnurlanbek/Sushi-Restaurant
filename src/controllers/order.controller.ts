import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Response } from "express";
import Errors, { HttpCode } from "../libs/Errors";
import OrderService from "../models/Order.service";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";

const orderController: T  = {};

 const orderService = new OrderService();

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
    try{
        console.log("createOrder");
        const result = await orderService.createOrder(req.member, req.body);

        res.status(HttpCode.CREATED).json(result);

    } catch (err) {
        console.log("Error, createOrder:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
    try{
        console.log("getMyOrders");
        const {page, limit, orderStatus} = req.query;
        const inquiry: OrderInquiry = {
            page: Number(page),
            limit: Number(limit),
            orderStatus: orderStatus as OrderStatus,
        }
        console.log("inqury", inquiry)
        const result = await orderService.gerMyOrders(req.member, inquiry)
        res.status(HttpCode.CREATED).json(result);

    } catch (err) {
        console.log("Error, getMyOrders:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

orderController.updateOrder = async (req: ExtendedRequest, res: Response) => {
    try{
        console.log("updateOrder");
        const input: OrderUpdateInput =req.body;
        const reslut = await orderService.updateOrder(req.member, input)


        res.status(HttpCode.CREATED).json(reslut);
    } catch (err) {
        console.log("Error, updateOrder:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}




export default orderController;