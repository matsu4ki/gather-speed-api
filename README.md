Gatherで人の速度を上げるためのアプリ
========================

macなら、bunが入っていればdistにバイナリファイルを生成する感じ。
第一引数は速度で、デフォルトは1.0。10にしたら吹き飛ぶ。
試したところ、小数点の対応もしているみたい。0.1とかにすると全然歩けない。

```bash
# binary(need bun build)
./gather-speed-api 5
# node
npm i
node index.js 5
```

LICENSE: MIT License

## 参考

- change gather speed
  - https://note.com/wata_pixelart/n/nca265e7b1d08
- binary
  - https://efcl.info/2024/10/06/bun-single-file-executable-binary/
- websocket API
  - https://gathertown.notion.site/Gather-Websocket-API-bf2d5d4526db412590c3579c36141063
