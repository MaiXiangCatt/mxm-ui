import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Mxm-Ui',
  description: '一个练习用的组件库',
  // base: '/mxm-ui/',部署到githubPages用这个
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started' },
      { text: '组件', link: '/components/button' },
    ],

    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [{ text: '快速开始', link: '/get-started' }],
      },
      {
        text: '基础组件',
        collapsed: false,
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Dropdown 下拉菜单', link: 'components/dropdown' },
        ],
      },
      {
        text: '反馈组件',
        collapsed: false,
        items: [
          { text: 'Alert 提示', link: '/components/alert' },
          { text: 'Message 消息提示', link: '/components/message' },
          { text: 'Notification 通知', link: '/components/notification' },
          { text: 'Popconfirm 气泡确认框', link: 'components/popconfirm' },
          { text: 'Tooltip 文字提示', link: 'components/tooltip' },
        ],
      },
      {
        text: '表单组件',
        collapsed: false,
        items: [
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'Form 表单', link: '/components/form' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MaiXiangCatt/mxm-ui' },
    ],
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
})
