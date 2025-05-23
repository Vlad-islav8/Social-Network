import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts/font.css'
import App from './App';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

