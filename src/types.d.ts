// 在你的 src 文件夹中创建一个 types.d.ts 文件，或者直接在相关文件中添加以下代码

declare global {
  interface Window {
    adsbygoogle: any; // 或者你可以指定更精确的类型
  }
}

export {};
