import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification)  
  const cart = useSelector(state=> state.cart)
  const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)
 
  useEffect(() => {

    const sendRequest = async () => {
      // Send a Request 
      dispatch(uiActions.showNotification({
        open : true ,
        messsage : "Sending Request ",
        type : "warning"
      }))
      const res = await 
      fetch('https://redux-178a6-default-rtdb.firebaseio.com/cartItems.json',{
        method : "PUT",
        body : JSON.stringify(cart)
      }
      );
      const data =  await res.json();
      // Send State as Request is Successfull 
      dispatch(uiActions.showNotification({
        open : true ,
        message : "SENT  Request DONE  ",
        type : "success"
      }))

    }
    sendRequest().catch(err=>{
      // Send STate as Error 
      dispatch(uiActions.showNotification({
        open : true ,
        message : "SENT  Request FAILED   ",
        type : "error"
      }))
    })
   
  },[cart])
  
  return (
    <div className="App">
 {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}      { !isLoggedIn && <Auth /> }
      {  isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
