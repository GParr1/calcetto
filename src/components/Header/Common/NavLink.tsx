import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from 'components/Header/Common/LogoutBtn'
import { View } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';
import { btnNavLinkDefault, btnPrimaryDefault, ContainerProps, textDefault } from 'styles';
import Button, { ButtonType } from 'components/core/Button';

interface NavLinkProps {
  isMobile?: boolean
  classContainer?: RNStyleObject
  classBtn?: string
}

/** Desktop buttons */
const NavLink: React.FC<NavLinkProps> = ({
                                           isMobile = false,
                                           classContainer = '',
                                           classBtn = 'btn'
                                         }) => {
  const navigate = useNavigate()
  const { getResponsiveStyle } = useResponsiveStyle();

  const containerConfig= getResponsiveStyle({
      display: ['flex'],
      flexDirection: [ContainerProps.flexRow],
      marginTop: [8, 8, 0],
      padding: [12, 12, 0],
      width: ['100%','100%', 'auto' ],
      alignItems: ['center'],
      gap:[8]
    })

  const btnHomeConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: () => navigate('/dashboard'),
      style: {
        ...btnNavLinkDefault,
      },
      accessibilityLabel: "Go to dashboard",
    },
    label: 'Home',
  }
  const btnProfileConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: () => navigate('/profile'),
      style: {
        ...btnNavLinkDefault,
      },
      accessibilityLabel: "Go to Profile",
    },
    label: 'Profilo'
  }
  const btnMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: () => navigate('/partite'),
      style: {
        ...btnNavLinkDefault,
      },
      accessibilityLabel: "Go to Match",
    },
    label: 'Partite',
  }
  return (
    <View role={'navigation'} style={{...containerConfig}}>
      {isMobile && (
        <>
          <button
            className="btn"
            onClick={() => console.log('setting')}
            aria-label="Impostazioni"
          >
            <i className="bi bi-gear"></i>
          </button>
          <LogoutBtn />
        </>
      )}
      <Button {...btnHomeConfig}/>
      <Button {...btnProfileConfig}/>
      <Button {...btnMatchConfig}/>
    </View>
  )
}

export default NavLink
