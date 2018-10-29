import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css';
import thunk from 'redux-thunk';
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route , Switch} from 'react-router-dom'
import AuthRoute from './conponment/authroute/authroute';
import reduxReducers from "./reducer/reducer";
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import App from './App';
import Login from "./container/login/login";
import Register from "./container/register/register";
import BossInfo from "./container/bossinfo/bossinfo";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import Dashboard from "./conponment/dashboard/dashboard";
import Chat from "./conponment/chat/chat";
// const loggerMiddleware = createLogger({collapsed: true});

const store = createStore(reduxReducers, composeWithDevTools(
    applyMiddleware(thunk)
));



/*const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))*/

/*const store = createStore(
    reduxReducers,
    compose(
        applyMiddleware(thunk),
    )
);*/

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    {/*<DevTools />*/}
                    {/*path匹配的第一个*/}
                    {/*<Route path="/" exact component={App}></Route>*/}
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/geniusInfo" component={GeniusInfo} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat" component={ Chat } />
                    <Route component={Dashboard}></Route>
                </Switch>

            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));


