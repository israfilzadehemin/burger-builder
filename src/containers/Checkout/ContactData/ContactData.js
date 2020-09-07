import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Emin Israfilzadeh",
        address: {
          street: "Baku",
          zipCode: "12345",
          country: "Aze",
        },
        email: "men@gmail.com",
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((resp) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="name"
        />
        <input
          className={styles.Input}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postal code"
          placeholder="postal code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h5>Enter your Contact data</h5>
        {form}
      </div>
    );
  }
}

export default ContactData;
