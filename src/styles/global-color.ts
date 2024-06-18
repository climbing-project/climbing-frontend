export const enum COLOR {
  MAIN = "#307fe5", // 로고, 주요 버튼의 배경색 (이때 글자색 : 흰색 추천)
  LIGHT_MAIN = "#b1d3ff", // MAIN의 옅은색 버전, 강조 문구
  DISABLED = "#cacaca",
  WARNING = "#FFB1B1", // 경고 관련 아이콘, 버튼
  BORDER_UNFOCUSED = "#d0d0d0", // 구분선 or 비활성화 버튼(DISABLED와 합치는것 고려)
  SPECIAL = "#6f30e5", // 특별히 강조하고자 하는 버튼, 글자 or 기능 (MAIN, LIGHT_MAIN 색 외에 필요할때 )
}
