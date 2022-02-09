import React, { useState } from 'react';
import { useAcceptJs } from 'react-acceptjs';
import { useSnackbar } from 'notistack';

//TODO: Retrieve from database instead of hardcoding value in code
const authData = {
  apiLoginID: '3Y5u3Nnv',
  clientKey: '2R6S69gD6K6jHFgj',
};


const MakePayment = (props) => {
  const { dispatchData, loading, error } = useAcceptJs({ authData });
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cardCode: '',
  });

  const amount = props?.amount;
  const orderid = props?.orderid;
  const eventid = props?.eventid;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(cardData);
    // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
    const response = await dispatchData({ cardData });
    console.log('Received response:', response);

    if (response.messages.resultCode === "Error") {
        var i = 0;
        while (i < response.messages.message.length) {
            console.log(
                response.messages.message[i].code + ": " +
                response.messages.message[i].text
            );
            i = i + 1;
        }
        enqueueSnackbar(response.messages);
    }
    else{
        //payment succeeded updated order passed in and amounts then
        //redirect and send emails
        enqueueSnackbar('Payment Succeeded:' + response.messages);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
    <div className="row">
        <div className="col-md-4">
            <label>Credit Card Number:</label>
            <input
                type="text"
                name="cardNumber"
                placeholder="Enter Credit Card Number"
                value={cardData.cardNumber}
                onChange={(event) =>
                    setCardData({ ...cardData, cardNumber: event.target.value })
                    }
            />
        </div>
    </div>
    <div className="row">
        <div className="col-md-4">
            <label>Exp Month:</label>
            <input
                type="text"
                name="expMonth"
                placeholder="MM"
                value={cardData.expMonth}
                onChange={(event) =>
                    setCardData({ ...cardData, expMonth: event.target.value })
                }
            />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
            <label>Exp Year:</label>
            <input
                type="text"
                name="expYear"
                placeholder="YY"
                value={cardData.expYear}
                onChange={(event) =>
                    setCardData({ ...cardData, expYear: event.target.value })
                }
            />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
            <label>CCV Code:</label>
            <input
                type="text"
                name="cardCode"
                placeholder="Enter CCV Code"
                value={cardData.cardCode}
                onChange={(event) =>
                    setCardData({ ...cardData, cardCode: event.target.value })
                }
            />
        </div>
    </div>
      <button className="btn btn-submit" type="submit" disabled={loading || error}>
        Pay
      </button>
    </form>
  );
};

export default MakePayment;