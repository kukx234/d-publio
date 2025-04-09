import React, { useState, useEffect } from 'react';
const axios = require('axios');
import FormFields from '../../components/FormFields.jsx';
import CloseIcon from '../../components/icons/CloseIcon.jsx'

const OrderForm = () => {
  const [order_fields, setOrderFields] = useState({});
  const [form_submited, setSubmitForm] = useState(false);
  
  const fetchFields = async (model = 'Order') => {
    try {
      const fields = await window.api.fetchData('utils/get_model_fields/' + model);
      return fields;
    } catch (err) {
      console.error('Error fetching order fields:', err);
    }
  }

  useEffect(() => {
    let fields = fetchFields();
    //za svako polje koje ima ref trebam pozvati dohvat polja
    //ako je type array onda trebam ponovno pod type za svako polje provjeriti dal ima ref za polja 
    //ali što će meni sva ta polja na order-u , treba mi samo par polja koja trebam ispisati 
    //doslovno trebam samo za proizvode šifru , naziv, količinu kupljenu i cijenu , to imam kad dohvatim narudžbu
    //najbolje bi bilo sve to definirati u models admin fields, stavim type i stavim fields array da znam koja polja želim ispisati 

  }, []);

  return (
      <div>
        <h1>Dodavanje narudžbe</h1>
      </div>
  )
}

export default OrderForm;