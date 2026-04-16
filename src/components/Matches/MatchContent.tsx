import { Container } from 'components/core/Container/Container'
import { FC } from 'react'
import { Assets } from 'assets/assets'
import { Image } from 'react-native'
import { Table } from 'components/core/Table/Table'
import { TableRow } from 'components/core/Table/TableRow'
import {
  FlexDirection,
  FlexJustifyContent,
  SizesPx
} from 'components/core/Container/enum'
import { MatchContentProps } from 'components/Matches/types'


const MatchContent: FC<MatchContentProps> = (props) => {
  const { campo, data, tipo, players } = props
  const cardCommonConf = {
    flexGap: SizesPx.S
  }
  const cardConfig = {
    ...cardCommonConf,
    flexDirection: {
      mobile: FlexDirection.COLUMN,
      tablet: FlexDirection.COLUMN,
      desktop: FlexDirection.ROW
    },
    flexJustifyContent: FlexJustifyContent.SPACE_BETWEEN
  }
  return (
    <Container {...cardConfig}>
      <Container>
        <Image
          source={Assets.CAMPO_CALCIO_BG}
          style={{ width: 200, height: 100 }}
        />
      </Container>
      <Table>
        <TableRow key={'campo'} label="Campo:" value={campo} />
        <TableRow
          key={'date'}
          label="Data:"
          value={new Date(data).toLocaleString()}
        />
        <TableRow
          key={'type'}
          label={tipo}
          value={`Inscritti: ${players?.length ?? 0}`}
        />
      </Table>
    </Container>
  )
}
export default MatchContent
