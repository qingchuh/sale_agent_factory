import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import BusinessDevelopment from './pages/BusinessDevelopment'
import Leads from './pages/Leads'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

const { Content } = Layout

const App: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout className="ml-64">
        <Header />
        <Content className="m-6 p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/business-development" element={<BusinessDevelopment />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
