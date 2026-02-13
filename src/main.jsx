import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext.jsx';
import './styles/HomePage.css';
import HomePage from './pages/HomePage.jsx';
import AlgorithmLab from './pages/algorithm/AlgorithmLab.jsx';
import AStarPage from './pages/algorithm/AStarPage.jsx';
import SortingPage from './pages/algorithm/SortingPage.jsx';
import GreedyPage from './pages/algorithm/GreedyPage.jsx';
import SpringBootPage from './pages/springboot/SpringBootPage.jsx';
import DesignPatternLab from './pages/designpattern/DesignPatternLab.jsx';
import SingletonPage from './pages/designpattern/SingletonPage.jsx';
import FactoryMethodPage from './pages/designpattern/FactoryMethodPage.jsx';
import AbstractFactoryPage from './pages/designpattern/AbstractFactoryPage.jsx';
import BuilderPage from './pages/designpattern/BuilderPage.jsx';
import PrototypePage from './pages/designpattern/PrototypePage.jsx';
import AdapterPage from './pages/designpattern/AdapterPage.jsx';
import BridgePage from './pages/designpattern/BridgePage.jsx';
import CompositePage from './pages/designpattern/CompositePage.jsx';
import DecoratorPage from './pages/designpattern/DecoratorPage.jsx';
import FacadePage from './pages/designpattern/FacadePage.jsx';
import FlyweightPage from './pages/designpattern/FlyweightPage.jsx';
import ProxyPage from './pages/designpattern/ProxyPage.jsx';
import ChainOfResponsibilityPage from './pages/designpattern/ChainOfResponsibilityPage.jsx';
import CommandPage from './pages/designpattern/CommandPage.jsx';
import IteratorPage from './pages/designpattern/IteratorPage.jsx';
import MediatorPage from './pages/designpattern/MediatorPage.jsx';
import MementoPage from './pages/designpattern/MementoPage.jsx';
import ObserverPage from './pages/designpattern/ObserverPage.jsx';
import StatePage from './pages/designpattern/StatePage.jsx';
import StrategyPage from './pages/designpattern/StrategyPage.jsx';
import TemplateMethodPage from './pages/designpattern/TemplateMethodPage.jsx';
import VisitorPage from './pages/designpattern/VisitorPage.jsx';
import { PATTERN_LIST } from './pages/designpattern/patternList.js';

const PATTERN_ROUTE_MAP = {
  singleton: SingletonPage,
  'factory-method': FactoryMethodPage,
  'abstract-factory': AbstractFactoryPage,
  builder: BuilderPage,
  prototype: PrototypePage,
  adapter: AdapterPage,
  bridge: BridgePage,
  composite: CompositePage,
  decorator: DecoratorPage,
  facade: FacadePage,
  flyweight: FlyweightPage,
  proxy: ProxyPage,
  'chain-of-responsibility': ChainOfResponsibilityPage,
  command: CommandPage,
  iterator: IteratorPage,
  mediator: MediatorPage,
  memento: MementoPage,
  observer: ObserverPage,
  state: StatePage,
  strategy: StrategyPage,
  'template-method': TemplateMethodPage,
  visitor: VisitorPage,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/algorithm" element={<HomePage />} />
        <Route path="/algorithm/lab" element={<AlgorithmLab />} />
        <Route path="/algorithm/astar" element={<AStarPage />} />
        <Route path="/algorithm/sorting" element={<SortingPage />} />
        <Route path="/algorithm/greedy" element={<GreedyPage />} />
        <Route path="/oop" element={<Navigate to="/design-pattern" replace />} />
        <Route path="/design-pattern" element={<DesignPatternLab />} />
        {PATTERN_LIST.map((p) => {
          const Component = PATTERN_ROUTE_MAP[p.slug];
          return (
            <Route
              key={p.slug}
              path={`/design-pattern/${p.slug}`}
              element={p.slug === 'singleton' ? <SingletonPage /> : <Component />}
            />
          );
        })}
        <Route path="/design-pattern/*" element={<Navigate to="/design-pattern" replace />} />
        <Route path="/springboot" element={<SpringBootPage />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
