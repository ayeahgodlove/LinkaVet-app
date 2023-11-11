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
import { useAuth } from "hooks/auth/auth.hook";
import { generateOrderNumber } from "utils/order-no";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import { emptyPayment } from "models/payment.model";

const PaymentFeedbackPage = () => {
  const [payResp, setPayResp] = useState<IInitPaymentResponse>({
    data: { ...emptyInitPayment },
    message: "",
    success: false,
    validationErrors: [],
  });
  const [error, setError] = useState<any>();
  const [retryCount, setRetryCount] = useState(0);

  const { initTransaction } = useInitTransaction();
  const { addPayment } = usePayment();
  const { addOrder, order } = useOrder();
  const { user } = useAuth();
  const { products } = useProduct();
  const { cartItems, findMatchingProducts } = useShoppingCart();
  const matchingProducts = findMatchingProducts(products, cartItems);

  const getTransactionStatus = useCallback(async (reference: string) => {
    await ProcessPaymentService.transactionStatus(reference)
      .then(async (resp) => {
        setPayResp(resp);
        if (!resp.success) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, 1000);
        }
        const feedback = await addOrder({
          ...emptyOrder,
          userId: user.id,
          orderNo: generateOrderNumber(),
          products: matchingProducts.map((m) => m.id),
          status: "PAID",
          totalAmount: matchingProducts.reduce((a, b) => a + b.amount, 0),
          totalQtty: matchingProducts.reduce((a,b) => a+b.qtty, 0)
        });
        
        if(feedback) {
          const response = await addPayment({
            ...emptyPayment,
            amount: order.totalAmount,
            orderNo: order.orderNo,
            status: order.status,
          })
          message.success("Payment successful!")
        }
        return resp;
      })
      .catch((error: any) => {
        console.error(error);
        setError(error);
        return error;
      });
  }, []);

  useEffect(() => {
    if (retryCount > 3) {
      // Stop retrying after a certain number of attempts
      console.log("Exceeded maximum retry attempts.");
      return;
    }

    getTransactionStatus(initTransaction.reference);
  }, [retryCount]);

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
                    description={payResp.data.name}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Amount"}
                    description={payResp.data.amount + " XAF"}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Address"}
                    description={payResp.data.address}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Email"}
                    description={payResp.data.email}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Telephone"}
                    description={payResp.data.telephone}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Operator"}
                    description={payResp.data.operator}
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
