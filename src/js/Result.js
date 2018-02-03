import React from 'react';
import styled from 'styled-components';

const StyledResult = styled.div`
  display: block;
  padding-bottom: 0.75em;
  clear: both;
  font-size: 89.1%;
  line-height: 1.4;

  @media screen and (min-width: 767px) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  a {
    text-transform: none;
  }

  &:last-of-type {
    padding-right: 1.5rem;
  }
`;

export const Result = ({ id, link, title }) =>
  title ? (
    <StyledResult key={id}>
      <a
        href={link}
        dangerouslySetInnerHTML={{
          __html: title.rendered
            .replace(' ,', '')
            .replace(' &nbsp;&nbsp;,', ''),
        }}
      />
    </StyledResult>
  ) : null;
