/* eslint-disable max-len */
import React from 'react';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { Button } from 'react-admin';

function Terms({ onClose, isOpen }) {
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>
        Termos de Privacidade do Sistema de Secretaria e Gestão de Membros
      </DialogTitle>

      <DialogContent>
        <p>A Igreja Presbiteriana de Jundiaí valoriza a privacidade e a segurança dos dados pessoais de seus membros. Este documento descreve como suas informações serão coletadas, usadas, armazenadas e protegidas. Ao utilizar nosso sistema de secretaria e gestão de membros, você concorda com os termos descritos abaixo.</p>

        <b>1. Coleta de Dados</b>

        <p>Coletamos dados pessoais fornecidos voluntariamente por você, como:</p>

        <ul>
          <li>Nome completo</li>
          <li>Data de nascimento</li>
          <li>Naturalidade</li>
          <li>Estado civil</li>
          <li>Data de casamento</li>
          <li>Nome do cônjuge</li>
          <li>Nome do pai</li>
          <li>Nome da mãe</li>
          <li>Nomes de outros integrantes da família</li>
          <li>Endereço</li>
          <li>Telefones pessoais</li>
          <li>E-mail</li>
          <li>Informações atuais profissionais e acadêmicas</li>
          <li>Informações de membresia na Igreja Presbiteriana de Jundiaí</li>
          <li>Senha escolhida pelo membro para autenticação em canais digitais da igreja</li>
        </ul>

        <b>2. Uso dos Dados</b>

        <p>Os dados coletados serão utilizados para:</p>

        <ul>
          <li>Manter registros precisos dos membros da igreja</li>
          <li>Facilitar a comunicação entre a igreja e seus membros</li>
          <li>Organizar e gerenciar eventos, atividades e grupos de interesse</li>
          <li>Administrar contribuições e doações</li>
          <li>Oferecer suporte pastoral e assistência</li>
        </ul>

        <b>3. Armazenamento e Proteção dos Dados</b>

        <p>Os seus dados serão armazenados em nossos sistemas internos e protegidos por medidas de segurança adequadas, incluindo:</p>

        <ul>
          <li>Uso de tecnologias de criptografia para proteger as informações armazenadas</li>
          <li>Acesso restrito aos dados apenas para pessoal autorizado</li>
          <li>Procedimentos regulares de backup para garantir a integridade dos dados</li>
        </ul>

        <b>4. Período de Retenção dos Dados</b>

        <p>Seus dados serão armazenados por um período de até 10 anos a partir da data de sua coleta ou da sua última interação com a igreja, o que ocorrer por último. Após esse período, os dados serão excluídos ou renovados conforme a vontade do membro em nossos sistemas de forma segura e definitiva.</p>

        <b>5. Compartilhamento de Dados</b>

        <p>Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para:</p>

        <ul>
          <li>Cumprir obrigações legais e regulatórias</li>
          <li>Proteger os direitos, a propriedade ou a segurança da Igreja, de seus membros ou do público</li>
          <li>Fornecer serviços essenciais por meio de fornecedores confiáveis, que estarão sujeitos a obrigações de confidencialidade</li>
        </ul>

        <b>6. Seus Direitos</b>

        <p>Você tem o direito de:</p>

        <ul>
          <li>Acessar seus dados pessoais armazenados em nosso sistema</li>
          <li>Solicitar a correção de dados incompletos, incorretos ou desatualizados</li>
          <li>Solicitar a exclusão de seus dados pessoais, sujeito aos requisitos legais de retenção</li>
          <li>Revogar seu consentimento para o processamento de seus dados pessoais, quando aplicável</li>
          <li>
            Para exercer seus direitos ou se você tiver qualquer dúvida sobre nossas práticas de privacidade, entre em contato conosco através do e-mail:
            <a href="mailto:secretaria@ipjundiai.org.br."> secretaria@ipjundiai.org.br.</a>
          </li>
        </ul>

        <b>7. Alterações nos Termos de Privacidade</b>

        <p>Podemos atualizar este Termo de Privacidade periodicamente para refletir mudanças em nossas práticas de dados. Recomendamos que você revise este documento regularmente. Avisaremos sobre quaisquer alterações significativas através de nossos canais de comunicação habituais.</p>

        <b>8. Contato</b>

        <p>Se você tiver perguntas ou preocupações sobre este Termo de Privacidade ou sobre como seus dados pessoais são tratados, por favor, entre em contato conosco:</p>

        <p>Igreja Presbiteriana de Jundiaí</p>
        <p>Endereço: R. Vig. J. J. Rodrigues, 504 - Centro, Jundiaí - SP, 13201-001</p>
        <p>E-mail: secretaria@ipjundiai.org.br</p>
        <p>Telefone: (11) 4586.2004</p>

        <p>Data de Vigência: 18/10/2024</p>

        <p>Ao utilizar nosso sistema de secretaria e gestão de membros, você reconhece que leu e compreendeu estes Termos de Privacidade e concorda com o tratamento de seus dados pessoais conforme descrito acima.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Terms;
