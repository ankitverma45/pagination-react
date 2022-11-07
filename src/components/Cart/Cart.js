import { useSelector } from "react-redux";
import Modal from "../Order/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem"
import { useDispatch } from "react-redux"
import { useState } from "react";
const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);

  const reduxData = useSelector(state => state.items)
  const reduxTotalAmount=useSelector(state=>state.totalAmount)

  const dispatch=useDispatch()

      const onAddCartHandler=(item)=>{
        dispatch({
          type: 'add',
          item: {
            ...item,amount:1
          }
          })
      }
      const removeItemHandler=(id)=>{
        dispatch({
          type: 'remove',
          id:id
        })
      }

      const hasItem=reduxData.length>0;

  const cartitems=<ul className={classes["cart-items"]}>{reduxData.map((item)=>
    <CartItem key={item.id} id={item.id} name={item.name} amount={item.amount} price={item.price} 
    onAdd={onAddCartHandler.bind(null,item)} onRemove={removeItemHandler.bind(null,item.id)}/>
  )}</ul>

  const modalAction=(<div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.hideCart}>Close</button>
   {hasItem && <button className={classes.button} >Order</button> }
  </div>)

  return (
    <Modal hideCart={props.hideCart}>
        {cartitems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$ {reduxTotalAmount}</span>
      </div>
       { !isCheckout &&  modalAction}
    </Modal>
  );
};
export default Cart;
