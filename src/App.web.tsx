import React, { FC } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import ResetPasswordView from 'View/ResetPasswordView';
import Dashboard from 'View/Dashboard';
import MatchesView from 'View/MatchesView';
import MyAccountView from 'View/MyAccountView';
import ConfirmProfileView from 'View/ConfirmProfileView';
import Header from 'components/Header/Header';
import { getUser } from 'state/auth/selectors';
import AppProviders from 'AppProviders';
import MainContainer from 'components/Auth/Common/MainContainer';
import FooterContainer from 'components/Auth/Common/FooterContainer';
import AuthView from 'View/AuthView';
import Leaderboard from 'components/Leaderboard/Leaderboard';
import RankingView from 'View/RankingView';


const App: FC = () => {
  const user = useSelector(getUser);

  const welcomeConfig = {
    path: "/welcome",
    element:(
      <>
        <Header/>
        <MainContainer>
          <AuthView />
        </MainContainer>
        <FooterContainer/>
      </>
    )
  }
  const createAccountConfig = {
    path: "/create-account",
    element:(
      <>
        <Header/>
        <MainContainer>
          <AuthView register />
        </MainContainer>
        <FooterContainer/>
      </>
    )
  }
  const resetPassConfig = {
    path: "/reset-password", element:(
      <>
        <MainContainer>
          <ResetPasswordView />
        </MainContainer>
        <FooterContainer/>
      </>
    )
  }
  const dashboardConfig = {
    path: "/dashboard",
    element:<PrivateRoute>
      <Header/>
      <MainContainer>
        <Dashboard />
      </MainContainer>
      <FooterContainer/>
    </PrivateRoute>
  }
  const classificaConfig = {
    path: "/classifica",
    element:<PrivateRoute>
      <Header/>
      <MainContainer>
        <RankingView />
      </MainContainer>
      <FooterContainer/>
    </PrivateRoute>
  }
  const matchConfig = {
    path: "/partite",
    element:<PrivateRoute>
      <Header/>
      <MainContainer>
        <MatchesView user={user} />
      </MainContainer>
      <FooterContainer/>

    </PrivateRoute>
  }
  const profileConfig = {
    path: "/profile",
    element: <PrivateRoute>
      <Header />
      <MainContainer>
        <MyAccountView />
      </MainContainer>
      <FooterContainer/>

    </PrivateRoute>
  }
  const confirmProfileConfig = {
    path: "/confirm-profile",
    element:<PrivateRoute>
      <MainContainer>
      <ConfirmProfileView user={user} />
      </MainContainer>
      <FooterContainer/>
    </PrivateRoute>
  }
  const catchNavigateConfig = {
    path: "*",
    element:<Navigate to={user ? '/dashboard' : '/welcome'} />
  }
  const emptyNavigateConfig = {
    path: "/",
    element:<Navigate to={user ? '/dashboard' : '/welcome'} />
  }
  return (
    <Router basename="/">
      <Routes>
        <Route {...catchNavigateConfig}/>
        <Route {...emptyNavigateConfig}/>
        <Route {...welcomeConfig} />
        <Route {...resetPassConfig}/>
        <Route {...createAccountConfig} />

        <Route {...dashboardConfig}/>
        <Route {...classificaConfig}/>
        <Route {...matchConfig}/>
        <Route {...profileConfig}/>
        <Route {...confirmProfileConfig}/>
      </Routes>
    </Router>
  );
};


export default function AppWeb() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
