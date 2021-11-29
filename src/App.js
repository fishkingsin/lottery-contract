import './App.css';
import React, { useEffect, useState } from 'react';
import lottery from './lottery';
import web3 from './web3';

const App: React.FC = () => {
  const [manager, setManager] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const init = async () => {
      const manager = await lottery.methods.manager().call();
      setManager(manager);
    };
    init();
  }, []);

  const submitForm = async (e: any) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting on transaction success...' + accounts[0]);
    await lottery.methods.mint(
      accounts[0],
      0,
      value, 
    ).send({
      from: accounts[0],
      amount: web3.utils.toWei(value, 'ether'),
    });
    setMessage('You have been entered!');
  };

  
  return (
    <div>
      <h2>Lottery</h2>
      <p>This contract is managed by {manager}</p>
      <hr />
      <form onSubmit={submitForm}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            style={{ marginLeft: '1vw' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button style={{ display: 'block', marginTop: '1vh' }}>Enter</button>
        </div>
      </form>
      <h1>{message}</h1>
    </div>
  );
};
export default App;
