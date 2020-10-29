const theme = {
  flex: ($justify = null, $align = null, $direction = null) => ({
    display: 'flex',
    'flex-direction': $direction,
    'justify-content': $justify,
    'align-items': $align,
  }),
};

export default theme;
