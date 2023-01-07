import { App } from './modules/App';
import 'file-loader?name=[name].[ext]!./index.html';
import 'file-loader?name=[name].[ext]!./favicon.ico';
import 'normalize.css';
import './stylesheets/style.scss';

App.renderApp();
