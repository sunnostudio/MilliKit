// アンケート項目 → QAキー / 3Dタグ の対応表 (事実情報のみ。本文は複製しない)
const BOOTHS = [
  { survey: "花王 ブース(必須)", qa: "C_Kao", tag: "kao" },
  { survey: "JFEスチール ブース(必須)", qa: "C_Jfe", tag: "jfe" },
  { survey: "栗田工業 ブース(必須)", qa: "C_Kurita", tag: "kurita" },
  { survey: "NGK ブース(必須)", qa: "C_Nihongaishi", tag: "nihongaishi" },
  { survey: "ソニー ブース(必須)", qa: "C_Sony", tag: "sony" },
  { survey: "デンカ ブース(必須)", qa: "C_Denka", tag: "denka" },
  { survey: "荏原製作所 ブース(必須)", qa: "C_Ebara", tag: "ebara" },
  { survey: "積水化学工業 ブース(必須)", qa: "C_Sekisui", tag: "sekisui" },
  { survey: "竹中工務店 ブース(任意)", qa: "C_Takenaka", tag: "takenaka" },
  { survey: "パイロットコーポレーション ブース(任意)", qa: "C_Pilot", tag: "pilot" },
  { survey: "住友ベークライト ブース(任意)", qa: "C_Sumitomo", tag: "sumitomo" },
  { survey: "エクシオグループ ブース(任意)", qa: "C_Exeo", tag: "exeo" },
];
