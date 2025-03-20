import React, { useId } from 'react';
import styled from 'styled-components';

import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

const dialogContents = {
  company: {
    id: 'company',
    title: '運営会社',
  },
  contact: {
    id: 'contact',
    title: 'お問い合わせ',
  },
  overview: {
    id: 'overview',
    title: 'Cyber TOONとは',
  },
  question: {
    id: 'question',
    title: 'Q&A',
  },
  term: {
    id: 'term',
    title: '利用規約',
  },
} as const;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const a11yId = useId();

  const [content, setContent] = React.useState<keyof typeof dialogContents | null>(null);
  const [body, setBody] = React.useState<null | string>(null);

  const handleRequestDialogOpen = async (content: keyof typeof dialogContents) => {
    setContent(content);
    try {
      const response = await fetch(`/assets/constants/${content}.txt`);
      const text = await response.text();
      setBody(text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
        <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
          <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
          <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
            <_Button disabled={!isClient} onClick={() => handleRequestDialogOpen('term')}>
              利用規約
            </_Button>
            <_Button disabled={!isClient} onClick={() => handleRequestDialogOpen('contact')}>
              お問い合わせ
            </_Button>
            <_Button disabled={!isClient} onClick={() => handleRequestDialogOpen('question')}>
              Q&A
            </_Button>
            <_Button disabled={!isClient} onClick={() => handleRequestDialogOpen('company')}>
              運営会社
            </_Button>
            <_Button disabled={!isClient} onClick={() => handleRequestDialogOpen('overview')}>
              Cyber TOONとは
            </_Button>
          </Flex>
        </Flex>
      </Box>
      <Dialog
        onClose={() => {
          setContent(null);
          setBody(null);
        }}
        open={!!content}
      >
        <_Content aria-labelledby={a11yId} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={a11yId} typography={Typography.NORMAL16}>
            {content ? dialogContents[content].title : ''}
          </Text>
          <Spacer height={Space * 1} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {body ? body : 'Loading...'}
          </Text>
        </_Content>
      </Dialog>
    </>
  );
};
