package com.champ.oms.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    MANAGER_READ("management:read"),
    MANAGER_UPDATE("management:update"),
    MANAGER_CREATE("management:create"),
    MANAGER_DELETE("management:delete"),
    CATEGORY_READ("category:read"),
    CATEGORY_UPDATE("category:update"),
    CATEGORY_CREATE("category:create"),
    CATEGORY_DELETE("category:delete"),
    MENU_READ("menu:read"),
    MENU_UPDATE("menu:update"),
    MENU_CREATE("menu:create"),
    MENU_DELETE("menu:delete"),
    ORDER_READ("order:read"),
    ORDER_UPDATE("order:update"),
    ORDER_CREATE("order:create"),
    ORDER_DELETE("order:delete"),
    ACCOUNT_READ("account:read"),
    ACCOUNT_UPDATE("account:update"),
    ACCOUNT_DELETE("account:delete"),

    ;

    @Getter
    private final String permission;
}
