import styled from '@emotion/styled';
 const LoadButton = styled.button`
  margin-right: auto;
  margin-left: auto;
  padding: 8px 16px;
  border-radius: 2px;
  outline: 0;
                    grid-gap: 8px;
                    align-items: center;
                    background-color: #3f51b5;
                    color: #000;
                    border: 1px solid #000;
                    border-radius: 4px;
                    cursor: pointer;
                    display: inline-flex;
                    flex-shrink: 0;
                    font-size: 20px;
                    font-weight: 600;
                    gap: 8px;
                    justify-content: center;
                    line-height: 1.5;
                    overflow: hidden;
                    text-decoration: none;
                    text-overflow: ellipsis;
                    transition: all .14s ease-out;
                    white-space: nowrap;
                    :hover {
                        box-shadow: 4px 4px 0 #000;
                        transform: translate(-4px,-4px);
                    }
                    :focus-visible{
                        outline-offset: 1px;
  }
`;
export { LoadButton };

             
