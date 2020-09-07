import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it is delicious!</h1>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
