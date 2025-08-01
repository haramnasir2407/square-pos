/* eslint-disable */
import type { AnySelector, Selectors } from './selectors';

export interface Conditions {
	/** `@media (hover: hover) and (pointer: fine) &:is(:hover, [data-hover])` */
	"_hover": string
	/** `&:is(:focus, [data-focus])` */
	"_focus": string
	/** `&:focus-within` */
	"_focusWithin": string
	/** `&:is(:focus-visible, [data-focus-visible])` */
	"_focusVisible": string
	/** `&:is([data-disabled])` */
	"_disabled": string
	/** `&:is(:active, [data-active])` */
	"_active": string
	/** `&:visited` */
	"_visited": string
	/** `&:target` */
	"_target": string
	/** `&:is(:read-only, [data-read-only])` */
	"_readOnly": string
	/** `&:read-write` */
	"_readWrite": string
	/** `&:is(:empty, [data-empty])` */
	"_empty": string
	/** `&:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"])` */
	"_checked": string
	/** `&:enabled` */
	"_enabled": string
	/** `&:is([aria-expanded=true], [data-expanded], [data-state="expanded"])` */
	"_expanded": string
	/** `&[data-highlighted]` */
	"_highlighted": string
	/** `&:is([data-complete])` */
	"_complete": string
	/** `&:is([data-incomplete])` */
	"_incomplete": string
	/** `&[data-dragging]` */
	"_dragging": string
	/** `&::before` */
	"_before": string
	/** `&::after` */
	"_after": string
	/** `&::first-letter` */
	"_firstLetter": string
	/** `&::first-line` */
	"_firstLine": string
	/** `&::marker` */
	"_marker": string
	/** `&::selection` */
	"_selection": string
	/** `&::file-selector-button` */
	"_file": string
	/** `&::backdrop` */
	"_backdrop": string
	/** `&:first-child` */
	"_first": string
	/** `&:last-child` */
	"_last": string
	/** `&:only-child` */
	"_only": string
	/** `&:nth-child(even)` */
	"_even": string
	/** `&:nth-child(odd)` */
	"_odd": string
	/** `&:first-of-type` */
	"_firstOfType": string
	/** `&:last-of-type` */
	"_lastOfType": string
	/** `&:only-of-type` */
	"_onlyOfType": string
	/** `.peer:is(:focus, [data-focus]) ~ &` */
	"_peerFocus": string
	/** `.peer:is(:hover, [data-hover]) ~ &` */
	"_peerHover": string
	/** `.peer:is(:active, [data-active]) ~ &` */
	"_peerActive": string
	/** `.peer:focus-within ~ &` */
	"_peerFocusWithin": string
	/** `.peer:is(:focus-visible, [data-focus-visible]) ~ &` */
	"_peerFocusVisible": string
	/** `.peer:is(:disabled, [disabled], [data-disabled]) ~ &` */
	"_peerDisabled": string
	/** `.peer:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"]) ~ &` */
	"_peerChecked": string
	/** `.peer:is(:invalid, [data-invalid], [aria-invalid=true]) ~ &` */
	"_peerInvalid": string
	/** `.peer:is([aria-expanded=true], [data-expanded], [data-state="expanded"]) ~ &` */
	"_peerExpanded": string
	/** `.peer:placeholder-shown ~ &` */
	"_peerPlaceholderShown": string
	/** `.group:is(:focus, [data-focus]) &` */
	"_groupFocus": string
	/** `.group:is(:hover, [data-hover]) &` */
	"_groupHover": string
	/** `.group:is(:active, [data-active]) &` */
	"_groupActive": string
	/** `.group:focus-within &` */
	"_groupFocusWithin": string
	/** `.group:is(:focus-visible, [data-focus-visible]) &` */
	"_groupFocusVisible": string
	/** `.group:is(:disabled, [disabled], [data-disabled]) &` */
	"_groupDisabled": string
	/** `.group:is(:checked, [data-checked], [aria-checked=true], [data-state="checked"]) &` */
	"_groupChecked": string
	/** `.group:is([aria-expanded=true], [data-expanded], [data-state="expanded"]) &` */
	"_groupExpanded": string
	/** `.group:is(:invalid, [data-invalid]) &` */
	"_groupInvalid": string
	/** `&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])` */
	"_indeterminate": string
	/** `&:is(:required, [data-required], [aria-required=true])` */
	"_required": string
	/** `&:is(:valid, [data-valid])` */
	"_valid": string
	/** `&:is([aria-invalid])` */
	"_invalid": string
	/** `&:autofill` */
	"_autofill": string
	/** `&:is(:in-range, [data-in-range])` */
	"_inRange": string
	/** `&:is(:out-of-range, [data-outside-range])` */
	"_outOfRange": string
	/** `&::placeholder, &[data-placeholder]` */
	"_placeholder": string
	/** `&:is(:placeholder-shown, [data-placeholder-shown])` */
	"_placeholderShown": string
	/** `&:is([aria-pressed=true], [data-pressed])` */
	"_pressed": string
	/** `&:is([aria-selected=true], [data-selected])` */
	"_selected": string
	/** `&:is([aria-grabbed=true], [data-grabbed])` */
	"_grabbed": string
	/** `&:is([data-state="under-value"])` */
	"_underValue": string
	/** `&[data-state=over-value]` */
	"_overValue": string
	/** `&[data-state=at-value]` */
	"_atValue": string
	/** `&:default` */
	"_default": string
	/** `&:optional` */
	"_optional": string
	/** `&[data-state=open]` */
	"_open": string
	/** `&[data-state=closed]` */
	"_closed": string
	/** `&:is(:fullscreen, [data-fullscreen])` */
	"_fullscreen": string
	/** `&:is([data-loading])` */
	"_loading": string
	/** `&:is([hidden])` */
	"_hidden": string
	/** `&:is([data-current])` */
	"_current": string
	/** `&[aria-current=page]` */
	"_currentPage": string
	/** `&[aria-current=step]` */
	"_currentStep": string
	/** `&:is([data-today])` */
	"_today": string
	/** `&[data-unavailable]` */
	"_unavailable": string
	/** `&[data-range-start]` */
	"_rangeStart": string
	/** `&[data-range-end]` */
	"_rangeEnd": string
	/** `&[data-now]` */
	"_now": string
	/** `&[data-topmost]` */
	"_topmost": string
	/** `@media (prefers-reduced-motion: reduce)` */
	"_motionReduce": string
	/** `@media (prefers-reduced-motion: no-preference)` */
	"_motionSafe": string
	/** `@media print` */
	"_print": string
	/** `@media (orientation: landscape)` */
	"_landscape": string
	/** `@media (orientation: portrait)` */
	"_portrait": string
	/** `.dark &` */
	"_dark": string
	/** `:root &, .light &` */
	"_light": string
	/** `@media (prefers-color-scheme: dark)` */
	"_osDark": string
	/** `@media (prefers-color-scheme: light)` */
	"_osLight": string
	/** `@media (forced-colors: active)` */
	"_highContrast": string
	/** `@media (prefers-contrast: less)` */
	"_lessContrast": string
	/** `@media (prefers-contrast: more)` */
	"_moreContrast": string
	/** `[dir=ltr] &` */
	"_ltr": string
	/** `[dir=rtl] &` */
	"_rtl": string
	/** `&::-webkit-scrollbar` */
	"_scrollbar": string
	/** `&::-webkit-scrollbar-thumb` */
	"_scrollbarThumb": string
	/** `&::-webkit-scrollbar-track` */
	"_scrollbarTrack": string
	/** `&[data-orientation=horizontal]` */
	"_horizontal": string
	/** `&[data-orientation=vertical]` */
	"_vertical": string
	/** `& :where(svg)` */
	"_icon": string
	/** `@starting-style` */
	"_starting": string
	/** `&:is([aria-collapsed=true], [data-collapsed], [data-state="collapsed"])` */
	"_collapsed": string
	/** `&:is([data-state="off"])` */
	"_off": string
	/** `&:is([data-state="on"])` */
	"_on": string
	/** `&[data-side=top]` */
	"_top": string
	/** `&[data-side=bottom]` */
	"_bottom": string
	/** `&[data-side=left]` */
	"_left": string
	/** `&[data-side=right]` */
	"_right": string
	/** `&:is([data-active=true])` */
	"_activeTrue": string
	/** `&:has(input:hover:not(:disabled))` */
	"_inputHover": string
	/** `&:has(input:focus:not(:disabled))` */
	"_inputFocus": string
	/** `&:has(input:disabled)` */
	"_inputDisabled": string
	/** `&:has(input[data-status=success])` */
	"_inputSuccess": string
	/** `&:has(input[data-status=success]:hover:not(:disabled))` */
	"_inputSuccessHover": string
	/** `&:has(input[data-status=success]:focus:not(:disabled))` */
	"_inputSuccessFocus": string
	/** `&:has(input[data-status=error])` */
	"_inputError": string
	/** `&:has(input[data-status=error]:hover:not(:disabled))` */
	"_inputErrorHover": string
	/** `&:has(input[data-status=error]:focus:not(:disabled))` */
	"_inputErrorFocus": string
	/** `&:has(input[data-status=warning])` */
	"_inputWarning": string
	/** `&:has(input[data-status=warning]:hover:not(:disabled))` */
	"_inputWarningHover": string
	/** `&:has(input[data-status=warning]:focus:not(:disabled))` */
	"_inputWarningFocus": string
	/** `&[data-field-state=error]` */
	"_errorState": string
	/** `@media screen and (min-width: 40rem)` */
	"sm": string
	/** `@media screen and (min-width: 40rem) and (max-width: 47.9975rem)` */
	"smOnly": string
	/** `@media screen and (max-width: 39.9975rem)` */
	"smDown": string
	/** `@media screen and (min-width: 48rem)` */
	"md": string
	/** `@media screen and (min-width: 48rem) and (max-width: 63.9975rem)` */
	"mdOnly": string
	/** `@media screen and (max-width: 47.9975rem)` */
	"mdDown": string
	/** `@media screen and (min-width: 64rem)` */
	"lg": string
	/** `@media screen and (min-width: 64rem) and (max-width: 79.9975rem)` */
	"lgOnly": string
	/** `@media screen and (max-width: 63.9975rem)` */
	"lgDown": string
	/** `@media screen and (min-width: 80rem)` */
	"xl": string
	/** `@media screen and (min-width: 80rem) and (max-width: 95.9975rem)` */
	"xlOnly": string
	/** `@media screen and (max-width: 79.9975rem)` */
	"xlDown": string
	/** `@media screen and (min-width: 96rem)` */
	"2xl": string
	/** `@media screen and (min-width: 96rem)` */
	"2xlOnly": string
	/** `@media screen and (max-width: 95.9975rem)` */
	"2xlDown": string
	/** `@media screen and (min-width: 40rem) and (max-width: 47.9975rem)` */
	"smToMd": string
	/** `@media screen and (min-width: 40rem) and (max-width: 63.9975rem)` */
	"smToLg": string
	/** `@media screen and (min-width: 40rem) and (max-width: 79.9975rem)` */
	"smToXl": string
	/** `@media screen and (min-width: 40rem) and (max-width: 95.9975rem)` */
	"smTo2xl": string
	/** `@media screen and (min-width: 48rem) and (max-width: 63.9975rem)` */
	"mdToLg": string
	/** `@media screen and (min-width: 48rem) and (max-width: 79.9975rem)` */
	"mdToXl": string
	/** `@media screen and (min-width: 48rem) and (max-width: 95.9975rem)` */
	"mdTo2xl": string
	/** `@media screen and (min-width: 64rem) and (max-width: 79.9975rem)` */
	"lgToXl": string
	/** `@media screen and (min-width: 64rem) and (max-width: 95.9975rem)` */
	"lgTo2xl": string
	/** `@media screen and (min-width: 80rem) and (max-width: 95.9975rem)` */
	"xlTo2xl": string
	/** The base (=no conditions) styles to apply  */
	"base": string
}

export type ConditionalValue<V> =
  | V
  | Array<V | null>
  | {
      [K in keyof Conditions]?: ConditionalValue<V>
    }

export type Nested<P> = P & {
  [K in Selectors]?: Nested<P>
} & {
  [K in AnySelector]?: Nested<P>
} & {
  [K in keyof Conditions]?: Nested<P>
}
