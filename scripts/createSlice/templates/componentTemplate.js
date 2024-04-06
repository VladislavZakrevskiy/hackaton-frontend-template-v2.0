const interfaceConst = 'interface';

module.exports = (componentName) => `import styled from 'styled-components'
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

${interfaceConst} ${componentName}Props {

}

const S${componentName} = styled.div\`

\`

export const ${componentName}: FC<${componentName}Props> = memo((props) => {
    const {} = props;
    const { t } = useTranslation();
    
    return (
        <S${componentName}>
            ${componentName}
        </S${componentName}>
    );
});`;
