import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
import CmsManagement from './pages/CmsManagement/CmsManagement';
import EmailManangement from './pages/EmailManagement/EmailManangement';
import MediaManagement from './pages/MediaManagement';
import BlogManagement from './pages/BlogManagement/BlogManagement';
import HomeSectionManagement from './pages/HomeSectionManagement';
import SeoSettings from './pages/SeoManagement/SeoSettings';
import NotificationSettings from './pages/NotificationSettings';
import Editprofilepage from './pages/Editprofilepage';
import InsertUser from './pages/UserManagement/InsertUser';
import Adminprofile from './pages/AdminProfilePage';
import AdminForgotPassword from './pages/AdminForgotPassword';
import EditCms from './pages/CmsManagement/EditCms';
import InsertCms from './pages/CmsManagement/InsertCms';
import EditEmail from './pages/EmailManagement/EditEmail';
import InsertBlog from './pages/BlogManagement/InsertBlog';
import EditBlog from './pages/BlogManagement/EditBlog';
import EditSeo from './pages/SeoManagement/EditSeo';
import InsertSeo from './pages/SeoManagement/InsertSeo';
// import NoMatch from './pages/NoMatch';





class App extends Component {

  render() {
    return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <Route exact path="/" component={Login}/>
          <Route exact  path="/dashboard" component={Dashboard}/>
          <Route exact  path="/user-list" component={UserManagement}/>
          <Route exact path="/cms-list" component={CmsManagement}/>
          <Route exact path="/email-list" component={EmailManangement}/>
          <Route exact path="/media" component={MediaManagement}/>
          <Route exact path="/blog-list" component={BlogManagement}/>
          <Route exact path="/home" component={HomeSectionManagement}/>
          <Route exact path="/seo-list" component={SeoSettings}/>
          <Route exact path="/notification" component={NotificationSettings}/>
          <Route exact path="/editprofile" component={Editprofilepage}/>
          <Route exact path="/newuser" component={InsertUser}/>
          <Route exact path="/adminprofile" component={Adminprofile}/>
          <Route exact path="/adminpassword" component={AdminForgotPassword}/>
          <Route exact path="/editcms" component={EditCms}/>
          <Route exact path="/newcms" component={InsertCms}/>
          <Route exact path="/editemail" component={EditEmail}/>
          <Route exact path="/newblog" component={InsertBlog}/>
          <Route exact path="/editblog" component={EditBlog}/>
          <Route exact path="/editseo" component={EditSeo}/>
          <Route exact path="/newseo" component={InsertSeo}/>


        {/* <Route path="*" component={NoMatch}/> */}
        </div>
      </Router>
      </PersistGate>
   </Provider>
    );
  }
}

export default App;
