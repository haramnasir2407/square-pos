/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index';
import type { Properties } from '../types/csstype';
import type { SystemProperties } from '../types/style-props';
import type { DistributiveOmit } from '../types/system-types';
import type { Tokens } from '../tokens/index';

export interface GridItemProperties {
   p?: SystemProperties["padding"]
	px?: SystemProperties["paddingInline"]
	py?: SystemProperties["paddingBlock"]
	pt?: SystemProperties["paddingTop"]
	pr?: SystemProperties["paddingRight"]
	pb?: SystemProperties["paddingBottom"]
	pl?: SystemProperties["paddingLeft"]
	m?: SystemProperties["margin"]
	mx?: SystemProperties["marginInline"]
	my?: SystemProperties["marginBlock"]
	mt?: SystemProperties["marginTop"]
	mr?: SystemProperties["marginRight"]
	mb?: SystemProperties["marginBottom"]
	ml?: SystemProperties["marginLeft"]
	w?: SystemProperties["width"]
	minW?: SystemProperties["minWidth"]
	maxW?: SystemProperties["maxWidth"]
	h?: SystemProperties["height"]
	minH?: SystemProperties["minHeight"]
	maxH?: SystemProperties["maxHeight"]
	position?: SystemProperties["position"]
	bg?: SystemProperties["backgroundColor"]
	colSpan?: ConditionalValue<number>
	rowSpan?: ConditionalValue<number>
	colStart?: ConditionalValue<number>
	rowStart?: ConditionalValue<number>
	colEnd?: ConditionalValue<number>
	rowEnd?: ConditionalValue<number>
}

interface GridItemStyles extends GridItemProperties, DistributiveOmit<SystemStyleObject, keyof GridItemProperties > {}

interface GridItemPatternFn {
  (styles?: GridItemStyles): string
  raw: (styles?: GridItemStyles) => SystemStyleObject
}


export declare const gridItem: GridItemPatternFn;
