import React, {useState, useEffect} from 'react'
import api from './api'

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  const fetchTransactions = async() => {
    const response = await api.get('/transacoes/');
    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transacoes/', formData);
    fetchTransactions();
    setFormData(
      {
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
      }
    );
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Aplicação Financeira
          </a>
        </div>
      </nav>
    
      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 mt-3'>
            <label htmlFor='amount' className='form-label'>
                Valor
            </label>
            <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
                Categoria
            </label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
                Descrição
            </label>
            <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='is_income' className='form-label'>
                É renda?
            </label>
            <input type='checkbox'  id='is_income' name='is_income' onChange={handleInputChange} value={formData.is_income}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='date' className='form-label'>
                Data
            </label>
            <input type='text' className='form-control' id='date' name='date' onChange={handleInputChange} value={formData.date}/>
          </div>    

          <button type='submit' className='btn btn-primary'>Submeter</button>

        </form>

        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Descricao</th>
              <th>É renda?</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transacoes) => (
              <tr key={transacoes.id}>
                <td>{transacoes.amount}</td>
                <td>{transacoes.category}</td>
                <td>{transacoes.description}</td>
                <td>{transacoes.is_income ? 'Sim' : 'Não'}</td>
                <td>{transacoes.date}</td>  
              </tr>

            ))}
          </tbody>
        </table>
      </div>   
  
    </div>
    
  )

}

export default App;
