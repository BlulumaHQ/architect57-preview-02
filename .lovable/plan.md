# 自訂樣式 Google 地圖（深色 + 品牌紅 Pin）

可以。目前首頁與 Contact 頁用的是 Google Maps 的 iframe embed，這種嵌入方式無法改顏色、也無法放自訂 pin。要達成需求，必須改用 Maps JavaScript API 來渲染地圖。

## 要做的事

1. **接上 Google Maps Platform 連接器**
   在聊天中會出現連接卡片，接上後才能取得地圖金鑰。

2. **新增一個共用地圖元件**（例如 `src/components/BrandMap.tsx`）
   - 以 Maps JavaScript API 非同步載入（`loading=async` + callback）
   - 中心點：203-2680 Shell Road, Richmond, BC（沿用現有座標 49.1766, -123.1286）
   - 停用預設 UI 雜訊，保留縮放控制
   - 高度由 prop 控制，維持現有版位尺寸

3. **深色極簡地圖樣式**
   使用自訂 `styles` 陣列，配合品牌 dark charcoal（`--surface-dark: 240 6% 10%`）：
   - 地表底色深灰、水域更深
   - 道路低飽和灰、標籤字白色低透明
   - 隱藏多餘 POI / 商家圖示，只保留必要地名

4. **品牌紅色 Map Pin**
   使用 `google.maps.Marker` 搭配自訂 SVG 圖示（`#a11d2d` 圓點 + 細外環），點擊顯示簡單資訊視窗：Architect 57 Inc. / 地址 / 電話。文字走現有 `LangContext` 雙語。

5. **替換兩處 iframe**
   - `src/pages/Index.tsx` 底部 MAP 區塊
   - `src/pages/Contact.tsx` 右欄地圖區塊
   版面、高度、圓角一律不變。

## 技術細節

- 瀏覽器端使用 `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`，僅用於載入 Maps JS API。
- 不使用 `AdvancedMarkerElement` / `mapId`（需 Cloud Console 設定），改用 `google.maps.Marker` + 程式碼內 `styles`，才能完整控制配色。
- 顏色值集中在元件內的 style 陣列，並對應 `index.css` 既有品牌色。
- 載入失敗或金鑰不可用時，退回目前的靜態 iframe，避免空白區塊。

## 需要注意

Lovable 提供的內建地圖金鑰只允許在 `*.lovable.app` 網域使用。若之後正式站要掛在 `www.architect57.com`，需要另外在 Google Cloud 建立一組自己的 API 金鑰並加入該網域白名單，我可以再協助設定。

## 不會動到的部分

不改版面設計、不動 CMS / Supabase、不動路由與其他區塊。
