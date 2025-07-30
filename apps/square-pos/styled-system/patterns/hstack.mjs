import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const hstackConfig = {
transform(props) {
  const { justify, gap, align, ...rest } = props;
  return {
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    gap,
    flexDirection: "row",
    ...rest
  };
},
defaultValues:{gap:'10px',align:'center'}}

export const getHstackStyle = (styles = {}) => {
  const _styles = getPatternStyles(hstackConfig, styles)
  return hstackConfig.transform(_styles, patternFns)
}

export const hstack = (styles) => css(getHstackStyle(styles))
hstack.raw = getHstackStyle