import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { NominalsTypes, PaymentTypes } from "../../../services/data-types";
import NominalItem from "./NominalItem"
import PaymentItem from "./PaymentItem"

interface TopupFormProps {
  nominals: NominalsTypes[];
  payments: PaymentTypes[];
}
export default function TopupForm(props: TopupFormProps) {
  const [verifyID, setVerifyID] = useState('');
  const {nominals, payments} = props;
  const [bankAccountName, setBankAccountName] = useState('');
  const [nominalItem, setNominalItem] = useState({});
  const [paymentItem, setPaymentItem] = useState({});
  const router = useRouter();

  const onNominalItemChange = (data: NominalsTypes) => {
    setNominalItem(data);
  };
  const onPaymentItemChange = (payment: String, bank: String, _id: String) =>{
    const data = {
      payment,
      bank,
      _id,
    };
    setPaymentItem(data);
  }
  const onSubmit = () => {
    if(verifyID === '' || bankAccountName === '' || nominalItem === !{} || paymentItem === !{}){
      toast.error('Isi semua data yang masih kosong!')
    }else{
      const data = {
        verifyID,
        bankAccountName,
        nominalItem,
        paymentItem,
      }
      localStorage.setItem("data-topup", JSON.stringify(data));
      router.push('/checkout');
    }
  };
  return (
    <div>
      <div className="pt-md-50 pt-30">
        <div className="">
          <label
            htmlFor="ID"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            id="ID"
            name="ID"
            aria-describedby="verifyID"
            placeholder="Enter your ID"
            value={verifyID}
            onChange={(event) => setVerifyID(event.target.value)}
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
        {nominals.map(nominal=> {
            return <NominalItem  
              key={nominal._id} 
              _id={nominal._id} 
              coinQuantity={nominal.coinQuantity} 
              coinName={nominal.coinName} 
              price={nominal.price}
              onChange={() => onNominalItemChange(nominal)}
            />
          })}
          <div className="col-lg-4 col-sm-6"></div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
          {/* {payments.map(payment => {
              payment.banks.map(bank => {
                return <PaymentItem 
                bankID={bank._id} 
                type={payment.type} 
                name={bank.bankName}
                />
              })
            })} */}
            <PaymentItem bankID="126" type="Transfer" name="BCA" onChange={() => onPaymentItemChange("Transfer", "BCA", "60ae2431196ccd27e6587ab1")}/>
            <PaymentItem bankID="127" type="Transfer" name="Mandiri" onChange={() => onPaymentItemChange("Transfer", "Mandiri", "60ae2431196ccd27e6587ab3")}/>
            <div className="col-lg-4 col-sm-6"></div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
          value={bankAccountName}
          onChange={(event) => setBankAccountName(event.target.value)}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="submit"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
