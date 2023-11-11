import { Alert, Card, Col, List, Row, Typography, message } from "antd";
import BackButton from "components/shared/back-button.component";
import { useInitTransaction } from "hooks/shopping-cart/init-transaction.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import {
  IInitPaymentResponse,
  emptyInitPayment,
} from "models/init-payment.model";
import React, { useCallback, useEffect, useState } from "react";
import { ProcessPaymentService } from "services/process-payment.service";
import "./payment-feedback.style.scss";
import { usePayment } from "hooks/payment.hook";
import { useOrder } from "hooks/order.hook";
import { emptyOrder } from "models/order.model";
import { generateOrderNumber } from "utils/order-no";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import { emptyPayment } from "models/payment.model";
import { OrderService } from "services/order.service";

const PaymentFeedbackPage = () => {
  const [payResp, setPayResp] = useState<IInitPaymentResponse>({
    data: { ...emptyInitPayment },
    message: "",
    success: false,
    validationErrors: [],
  });
  const [error, setError] = useState<any>();
  const [retryCount, setRetryCount] = useState(0);

  const { initTransaction, initPayment } = useInitTransaction();
  const { addPayment } = usePayment();
  const { order, setOrder } = useOrder();
  const { products } = useProduct();
  const { cartItems, findMatchingProducts } = useShoppingCart();
  const matchingProducts = findMatchingProducts(products, cartItems);

  const getTransactionStatus = useCallback(
    async (reference: string) => {
      await ProcessPaymentService.transactionStatus(reference)
        .then(async (resp) => {
          setPayResp(resp);
          if (!resp.success) {
            setTimeout(() => {
              setRetryCount(retryCount + 1);
            }, 1000);
          }
          await OrderService.create({
            ...emptyOrder,
            orderNo: generateOrderNumber(),
            products: matchingProducts.map((m) => m.id),
            status: "PAID",
            totalAmount: matchingProducts.reduce((a, b) => a + b.amount, 0),
            totalQtty: matchingProducts.reduce((a, b) => a + b.qtty, 0),
            address:initPayment.address,
            cellPhone: initPayment.telephone,
            email: initPayment.email,
            username: initPayment.name
          })
            .then(async (resp) => {
              setOrder(resp.data);
              const response = await addPayment({
                ...emptyPayment,
                amount: resp.data.totalAmount,
                orderNo: resp.data.orderNo,
                status: resp.data.status,
                address:initPayment.address,
                cellPhone: initPayment.telephone,
                email: initPayment.email,
                username: initPayment.name
              });
              if (response) {
                message.success("Payment successful!");
              } else {
                message.error("Payment failed!");
              }
            })
            .catch((err) => console.log(err));

          return resp;
        })
        .catch((error: any) => {
          console.error(error);
          setError(error);
          return error;
        });
    },
    [order]
  );

  useEffect(() => {
    if (retryCount > 3) {
      // Stop retrying after a certain number of attempts
      console.log("Exceeded maximum retry attempts.");
      return;
    }

    getTransactionStatus(initTransaction.reference);
  }, [retryCount, order]);

  return (
    <GeneralAppShell>
      <Row
        className="payment-feedback-container"
        align={"middle"}
        justify={"center"}
      >
        <Col xs={24} md={14} className="payment-feedback">
          <BackButton title="Transaction Feedback" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card title={"Order details"} style={{ width: "100%" }}>
              <Typography.Title level={5}>{payResp.data.name}</Typography.Title>
              <List itemLayout="horizontal">
                <List.Item>
                  <List.Item.Meta
                    title={"Username"}
                    description={order.orderNo}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Amount"}
                    description={initPayment.amount + " XAF"}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Address"}
                    description={initPayment.address}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Email"}
                    description={initPayment.email}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Telephone"}
                    description={initPayment.telephone}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Adress"}
                    description={initPayment.address}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Operator"}
                    description={initTransaction.operator}
                  />
                </List.Item>
              </List>
              {error && <Alert message={error.message} />}
            </Card>
          </div>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default PaymentFeedbackPage;
