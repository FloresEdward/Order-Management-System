package com.champ.oms.document;

import com.champ.oms.user.Permission;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {

  USER(Collections.emptySet()),
  ADMIN(
          Set.of(
                  Permission.ADMIN_READ,
                  Permission.ADMIN_UPDATE,
                  Permission.ADMIN_DELETE,
                  Permission.ADMIN_CREATE,
                  Permission.MANAGER_READ,
                  Permission.MANAGER_UPDATE,
                  Permission.MANAGER_DELETE,
                  Permission.MANAGER_CREATE,
                  Permission.CATEGORY_READ,
                  Permission.CATEGORY_UPDATE,
                  Permission.CATEGORY_DELETE,
                  Permission.CATEGORY_CREATE,
                  Permission.MENU_READ,
                  Permission.MENU_UPDATE,
                  Permission.MENU_DELETE,
                  Permission.MENU_CREATE,
                  Permission.ORDER_READ,
                  Permission.ORDER_UPDATE,
                  Permission.ORDER_DELETE,
                  Permission.ORDER_CREATE,
                  Permission.ACCOUNT_READ,
                  Permission.ACCOUNT_UPDATE,
                  Permission.ACCOUNT_DELETE
          )
  ),
  MANAGER(
          Set.of(
                  Permission.MANAGER_READ,
                  Permission.MANAGER_UPDATE,
                  Permission.MANAGER_DELETE,
                  Permission.MANAGER_CREATE
          )
  ),
  CATEGORY(
          Set.of(
                  Permission.CATEGORY_READ,
                  Permission.CATEGORY_UPDATE,
                  Permission.CATEGORY_DELETE,
                  Permission.CATEGORY_CREATE,
                  Permission.MENU_READ,
                  Permission.ORDER_CREATE
          )
  ),
  MENU(
          Set.of(
                  Permission.MENU_READ,
                  Permission.MENU_UPDATE,
                  Permission.MENU_DELETE,
                  Permission.MENU_CREATE,
                  Permission.CATEGORY_READ,
                  Permission.ORDER_CREATE
          )
  ),
  ORDER(
          Set.of(
                  Permission.ORDER_READ,
                  Permission.ORDER_UPDATE,
                  Permission.ORDER_DELETE,
                  Permission.ORDER_CREATE,
                  Permission.CATEGORY_READ,
                  Permission.MENU_READ
          )
  ),
  ACCOUNT(
          Set.of(
                  Permission.ACCOUNT_READ,
                  Permission.ACCOUNT_UPDATE,
                  Permission.ACCOUNT_DELETE
          )
  ),
  TELLER(
          Set.of(
                  Permission.ORDER_READ,
                  Permission.ORDER_CREATE
          )
  ),
  RIDER(
          Set.of(
                  Permission.ORDER_READ,
                  Permission.ORDER_UPDATE
          )
  );

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
            .stream()
            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
            .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}
