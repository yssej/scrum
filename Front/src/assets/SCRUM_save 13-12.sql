PGDMP     -    8                {            gestion_de_projet    14.4    14.4 M   0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            3           1262    171648    gestion_de_projet    DATABASE     m   CREATE DATABASE gestion_de_projet WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';
 !   DROP DATABASE gestion_de_projet;
                postgres    false            �            1259    171649    admin_event_entity    TABLE     �  CREATE TABLE public.admin_event_entity (
    id character varying(36) NOT NULL,
    admin_event_time bigint,
    realm_id character varying(255),
    operation_type character varying(255),
    auth_realm_id character varying(255),
    auth_client_id character varying(255),
    auth_user_id character varying(255),
    ip_address character varying(255),
    resource_path character varying(2550),
    representation text,
    error character varying(255),
    resource_type character varying(64)
);
 &   DROP TABLE public.admin_event_entity;
       public         heap    postgres    false            �            1259    171654    associated_policy    TABLE     �   CREATE TABLE public.associated_policy (
    policy_id character varying(36) NOT NULL,
    associated_policy_id character varying(36) NOT NULL
);
 %   DROP TABLE public.associated_policy;
       public         heap    postgres    false            �            1259    171657    authentication_execution    TABLE     �  CREATE TABLE public.authentication_execution (
    id character varying(36) NOT NULL,
    alias character varying(255),
    authenticator character varying(36),
    realm_id character varying(36),
    flow_id character varying(36),
    requirement integer,
    priority integer,
    authenticator_flow boolean DEFAULT false NOT NULL,
    auth_flow_id character varying(36),
    auth_config character varying(36)
);
 ,   DROP TABLE public.authentication_execution;
       public         heap    postgres    false            �            1259    171661    authentication_flow    TABLE     t  CREATE TABLE public.authentication_flow (
    id character varying(36) NOT NULL,
    alias character varying(255),
    description character varying(255),
    realm_id character varying(36),
    provider_id character varying(36) DEFAULT 'basic-flow'::character varying NOT NULL,
    top_level boolean DEFAULT false NOT NULL,
    built_in boolean DEFAULT false NOT NULL
);
 '   DROP TABLE public.authentication_flow;
       public         heap    postgres    false            �            1259    171669    authenticator_config    TABLE     �   CREATE TABLE public.authenticator_config (
    id character varying(36) NOT NULL,
    alias character varying(255),
    realm_id character varying(36)
);
 (   DROP TABLE public.authenticator_config;
       public         heap    postgres    false            �            1259    171672    authenticator_config_entry    TABLE     �   CREATE TABLE public.authenticator_config_entry (
    authenticator_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);
 .   DROP TABLE public.authenticator_config_entry;
       public         heap    postgres    false            �            1259    171677    broker_link    TABLE     L  CREATE TABLE public.broker_link (
    identity_provider character varying(255) NOT NULL,
    storage_provider_id character varying(255),
    realm_id character varying(36) NOT NULL,
    broker_user_id character varying(255),
    broker_username character varying(255),
    token text,
    user_id character varying(255) NOT NULL
);
    DROP TABLE public.broker_link;
       public         heap    postgres    false            �            1259    171682    client    TABLE     �  CREATE TABLE public.client (
    id character varying(36) NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    full_scope_allowed boolean DEFAULT false NOT NULL,
    client_id character varying(255),
    not_before integer,
    public_client boolean DEFAULT false NOT NULL,
    secret character varying(255),
    base_url character varying(255),
    bearer_only boolean DEFAULT false NOT NULL,
    management_url character varying(255),
    surrogate_auth_required boolean DEFAULT false NOT NULL,
    realm_id character varying(36),
    protocol character varying(255),
    node_rereg_timeout integer DEFAULT 0,
    frontchannel_logout boolean DEFAULT false NOT NULL,
    consent_required boolean DEFAULT false NOT NULL,
    name character varying(255),
    service_accounts_enabled boolean DEFAULT false NOT NULL,
    client_authenticator_type character varying(255),
    root_url character varying(255),
    description character varying(255),
    registration_token character varying(255),
    standard_flow_enabled boolean DEFAULT true NOT NULL,
    implicit_flow_enabled boolean DEFAULT false NOT NULL,
    direct_access_grants_enabled boolean DEFAULT false NOT NULL,
    always_display_in_console boolean DEFAULT false NOT NULL
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    171700    client_attributes    TABLE     �   CREATE TABLE public.client_attributes (
    client_id character varying(36) NOT NULL,
    value character varying(4000),
    name character varying(255) NOT NULL
);
 %   DROP TABLE public.client_attributes;
       public         heap    postgres    false            �            1259    171705    client_auth_flow_bindings    TABLE     �   CREATE TABLE public.client_auth_flow_bindings (
    client_id character varying(36) NOT NULL,
    flow_id character varying(36),
    binding_name character varying(255) NOT NULL
);
 -   DROP TABLE public.client_auth_flow_bindings;
       public         heap    postgres    false            �            1259    171708    client_default_roles    TABLE     �   CREATE TABLE public.client_default_roles (
    client_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);
 (   DROP TABLE public.client_default_roles;
       public         heap    postgres    false            �            1259    171711    client_initial_access    TABLE     �   CREATE TABLE public.client_initial_access (
    id character varying(36) NOT NULL,
    realm_id character varying(36) NOT NULL,
    "timestamp" integer,
    expiration integer,
    count integer,
    remaining_count integer
);
 )   DROP TABLE public.client_initial_access;
       public         heap    postgres    false            �            1259    171714    client_node_registrations    TABLE     �   CREATE TABLE public.client_node_registrations (
    client_id character varying(36) NOT NULL,
    value integer,
    name character varying(255) NOT NULL
);
 -   DROP TABLE public.client_node_registrations;
       public         heap    postgres    false            �            1259    171717    client_scope    TABLE     �   CREATE TABLE public.client_scope (
    id character varying(36) NOT NULL,
    name character varying(255),
    realm_id character varying(36),
    description character varying(255),
    protocol character varying(255)
);
     DROP TABLE public.client_scope;
       public         heap    postgres    false            �            1259    171722    client_scope_attributes    TABLE     �   CREATE TABLE public.client_scope_attributes (
    scope_id character varying(36) NOT NULL,
    value character varying(2048),
    name character varying(255) NOT NULL
);
 +   DROP TABLE public.client_scope_attributes;
       public         heap    postgres    false            �            1259    171727    client_scope_client    TABLE     �   CREATE TABLE public.client_scope_client (
    client_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL,
    default_scope boolean DEFAULT false NOT NULL
);
 '   DROP TABLE public.client_scope_client;
       public         heap    postgres    false            �            1259    171731    client_scope_role_mapping    TABLE     �   CREATE TABLE public.client_scope_role_mapping (
    scope_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);
 -   DROP TABLE public.client_scope_role_mapping;
       public         heap    postgres    false            �            1259    171734    client_session    TABLE     �  CREATE TABLE public.client_session (
    id character varying(36) NOT NULL,
    client_id character varying(36),
    redirect_uri character varying(255),
    state character varying(255),
    "timestamp" integer,
    session_id character varying(36),
    auth_method character varying(255),
    realm_id character varying(255),
    auth_user_id character varying(36),
    current_action character varying(36)
);
 "   DROP TABLE public.client_session;
       public         heap    postgres    false            �            1259    171739    client_session_auth_status    TABLE     �   CREATE TABLE public.client_session_auth_status (
    authenticator character varying(36) NOT NULL,
    status integer,
    client_session character varying(36) NOT NULL
);
 .   DROP TABLE public.client_session_auth_status;
       public         heap    postgres    false            �            1259    171742    client_session_note    TABLE     �   CREATE TABLE public.client_session_note (
    name character varying(255) NOT NULL,
    value character varying(255),
    client_session character varying(36) NOT NULL
);
 '   DROP TABLE public.client_session_note;
       public         heap    postgres    false            �            1259    171747    client_session_prot_mapper    TABLE     �   CREATE TABLE public.client_session_prot_mapper (
    protocol_mapper_id character varying(36) NOT NULL,
    client_session character varying(36) NOT NULL
);
 .   DROP TABLE public.client_session_prot_mapper;
       public         heap    postgres    false            �            1259    171750    client_session_role    TABLE     �   CREATE TABLE public.client_session_role (
    role_id character varying(255) NOT NULL,
    client_session character varying(36) NOT NULL
);
 '   DROP TABLE public.client_session_role;
       public         heap    postgres    false            �            1259    171753    client_user_session_note    TABLE     �   CREATE TABLE public.client_user_session_note (
    name character varying(255) NOT NULL,
    value character varying(2048),
    client_session character varying(36) NOT NULL
);
 ,   DROP TABLE public.client_user_session_note;
       public         heap    postgres    false            0           1259    180124    commentaire    TABLE     �   CREATE TABLE public.commentaire (
    id_commentaire bigint NOT NULL,
    commentaire text,
    temp timestamp without time zone,
    id_soustache bigint,
    id_tache bigint,
    id_createur character varying(255)
);
    DROP TABLE public.commentaire;
       public         heap    postgres    false            /           1259    180123    commentaire_id_commentaire_seq    SEQUENCE     �   CREATE SEQUENCE public.commentaire_id_commentaire_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.commentaire_id_commentaire_seq;
       public          postgres    false    304            4           0    0    commentaire_id_commentaire_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.commentaire_id_commentaire_seq OWNED BY public.commentaire.id_commentaire;
          public          postgres    false    303            �            1259    171758 	   component    TABLE     )  CREATE TABLE public.component (
    id character varying(36) NOT NULL,
    name character varying(255),
    parent_id character varying(36),
    provider_id character varying(36),
    provider_type character varying(255),
    realm_id character varying(36),
    sub_type character varying(255)
);
    DROP TABLE public.component;
       public         heap    postgres    false            �            1259    171763    component_config    TABLE     �   CREATE TABLE public.component_config (
    id character varying(36) NOT NULL,
    component_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(4000)
);
 $   DROP TABLE public.component_config;
       public         heap    postgres    false            �            1259    171768    composite_role    TABLE     �   CREATE TABLE public.composite_role (
    composite character varying(36) NOT NULL,
    child_role character varying(36) NOT NULL
);
 "   DROP TABLE public.composite_role;
       public         heap    postgres    false            �            1259    171771 
   credential    TABLE     $  CREATE TABLE public.credential (
    id character varying(36) NOT NULL,
    salt bytea,
    type character varying(255),
    user_id character varying(36),
    created_date bigint,
    user_label character varying(255),
    secret_data text,
    credential_data text,
    priority integer
);
    DROP TABLE public.credential;
       public         heap    postgres    false            �            1259    171776    databasechangelog    TABLE     Y  CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);
 %   DROP TABLE public.databasechangelog;
       public         heap    postgres    false            �            1259    171781    databasechangeloglock    TABLE     �   CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);
 )   DROP TABLE public.databasechangeloglock;
       public         heap    postgres    false            �            1259    171784    default_client_scope    TABLE     �   CREATE TABLE public.default_client_scope (
    realm_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL,
    default_scope boolean DEFAULT false NOT NULL
);
 (   DROP TABLE public.default_client_scope;
       public         heap    postgres    false            2           1259    180133    etat_projet    TABLE     e   CREATE TABLE public.etat_projet (
    id bigint NOT NULL,
    nom character varying(255) NOT NULL
);
    DROP TABLE public.etat_projet;
       public         heap    postgres    false            1           1259    180132    etat_projet_id_seq    SEQUENCE     {   CREATE SEQUENCE public.etat_projet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.etat_projet_id_seq;
       public          postgres    false    306            5           0    0    etat_projet_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.etat_projet_id_seq OWNED BY public.etat_projet.id;
          public          postgres    false    305            4           1259    180140    etat_soustache    TABLE     h   CREATE TABLE public.etat_soustache (
    id bigint NOT NULL,
    nom character varying(255) NOT NULL
);
 "   DROP TABLE public.etat_soustache;
       public         heap    postgres    false            3           1259    180139    etat_soustache_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.etat_soustache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.etat_soustache_id_seq;
       public          postgres    false    308            6           0    0    etat_soustache_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.etat_soustache_id_seq OWNED BY public.etat_soustache.id;
          public          postgres    false    307            6           1259    180147    etat_sprint    TABLE     e   CREATE TABLE public.etat_sprint (
    id bigint NOT NULL,
    nom character varying(255) NOT NULL
);
    DROP TABLE public.etat_sprint;
       public         heap    postgres    false            5           1259    180146    etat_sprint_id_seq    SEQUENCE     {   CREATE SEQUENCE public.etat_sprint_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.etat_sprint_id_seq;
       public          postgres    false    310            7           0    0    etat_sprint_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.etat_sprint_id_seq OWNED BY public.etat_sprint.id;
          public          postgres    false    309            8           1259    180154 
   etat_tache    TABLE     d   CREATE TABLE public.etat_tache (
    id bigint NOT NULL,
    nom character varying(255) NOT NULL
);
    DROP TABLE public.etat_tache;
       public         heap    postgres    false            7           1259    180153    etat_tache_id_seq    SEQUENCE     z   CREATE SEQUENCE public.etat_tache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.etat_tache_id_seq;
       public          postgres    false    312            8           0    0    etat_tache_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.etat_tache_id_seq OWNED BY public.etat_tache.id;
          public          postgres    false    311            �            1259    171788    event_entity    TABLE     �  CREATE TABLE public.event_entity (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    details_json character varying(2550),
    error character varying(255),
    ip_address character varying(255),
    realm_id character varying(255),
    session_id character varying(255),
    event_time bigint,
    type character varying(255),
    user_id character varying(255)
);
     DROP TABLE public.event_entity;
       public         heap    postgres    false            �            1259    171793    fed_user_attribute    TABLE     (  CREATE TABLE public.fed_user_attribute (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    value character varying(2024)
);
 &   DROP TABLE public.fed_user_attribute;
       public         heap    postgres    false            �            1259    171798    fed_user_consent    TABLE     �  CREATE TABLE public.fed_user_consent (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    created_date bigint,
    last_updated_date bigint,
    client_storage_provider character varying(36),
    external_client_id character varying(255)
);
 $   DROP TABLE public.fed_user_consent;
       public         heap    postgres    false            �            1259    171803    fed_user_consent_cl_scope    TABLE     �   CREATE TABLE public.fed_user_consent_cl_scope (
    user_consent_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);
 -   DROP TABLE public.fed_user_consent_cl_scope;
       public         heap    postgres    false            �            1259    171806    fed_user_credential    TABLE     �  CREATE TABLE public.fed_user_credential (
    id character varying(36) NOT NULL,
    salt bytea,
    type character varying(255),
    created_date bigint,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    user_label character varying(255),
    secret_data text,
    credential_data text,
    priority integer
);
 '   DROP TABLE public.fed_user_credential;
       public         heap    postgres    false            �            1259    171811    fed_user_group_membership    TABLE     �   CREATE TABLE public.fed_user_group_membership (
    group_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);
 -   DROP TABLE public.fed_user_group_membership;
       public         heap    postgres    false            �            1259    171814    fed_user_required_action    TABLE       CREATE TABLE public.fed_user_required_action (
    required_action character varying(255) DEFAULT ' '::character varying NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);
 ,   DROP TABLE public.fed_user_required_action;
       public         heap    postgres    false            �            1259    171820    fed_user_role_mapping    TABLE     �   CREATE TABLE public.fed_user_role_mapping (
    role_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);
 )   DROP TABLE public.fed_user_role_mapping;
       public         heap    postgres    false            �            1259    171823    federated_identity    TABLE       CREATE TABLE public.federated_identity (
    identity_provider character varying(255) NOT NULL,
    realm_id character varying(36),
    federated_user_id character varying(255),
    federated_username character varying(255),
    token text,
    user_id character varying(36) NOT NULL
);
 &   DROP TABLE public.federated_identity;
       public         heap    postgres    false            �            1259    171828    federated_user    TABLE     �   CREATE TABLE public.federated_user (
    id character varying(255) NOT NULL,
    storage_provider_id character varying(255),
    realm_id character varying(36) NOT NULL
);
 "   DROP TABLE public.federated_user;
       public         heap    postgres    false            L           1259    188614    fichier    TABLE       CREATE TABLE public.fichier (
    id_fichier bigint NOT NULL,
    chemin character varying(255),
    date_creation timestamp without time zone,
    nom character varying(255) NOT NULL,
    id_commentaire bigint,
    id_projet bigint,
    id_user character varying(255)
);
    DROP TABLE public.fichier;
       public         heap    postgres    false            K           1259    188613    fichier_id_fichier_seq    SEQUENCE        CREATE SEQUENCE public.fichier_id_fichier_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.fichier_id_fichier_seq;
       public          postgres    false    332            9           0    0    fichier_id_fichier_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.fichier_id_fichier_seq OWNED BY public.fichier.id_fichier;
          public          postgres    false    331            �            1259    171833    group_attribute    TABLE       CREATE TABLE public.group_attribute (
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255),
    group_id character varying(36) NOT NULL
);
 #   DROP TABLE public.group_attribute;
       public         heap    postgres    false            �            1259    171839    group_role_mapping    TABLE     �   CREATE TABLE public.group_role_mapping (
    role_id character varying(36) NOT NULL,
    group_id character varying(36) NOT NULL
);
 &   DROP TABLE public.group_role_mapping;
       public         heap    postgres    false            �            1259    171842    identity_provider    TABLE     �  CREATE TABLE public.identity_provider (
    internal_id character varying(36) NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    provider_alias character varying(255),
    provider_id character varying(255),
    store_token boolean DEFAULT false NOT NULL,
    authenticate_by_default boolean DEFAULT false NOT NULL,
    realm_id character varying(36),
    add_token_role boolean DEFAULT true NOT NULL,
    trust_email boolean DEFAULT false NOT NULL,
    first_broker_login_flow_id character varying(36),
    post_broker_login_flow_id character varying(36),
    provider_display_name character varying(255),
    link_only boolean DEFAULT false NOT NULL
);
 %   DROP TABLE public.identity_provider;
       public         heap    postgres    false            �            1259    171853    identity_provider_config    TABLE     �   CREATE TABLE public.identity_provider_config (
    identity_provider_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);
 ,   DROP TABLE public.identity_provider_config;
       public         heap    postgres    false            �            1259    171858    identity_provider_mapper    TABLE       CREATE TABLE public.identity_provider_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    idp_alias character varying(255) NOT NULL,
    idp_mapper_name character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL
);
 ,   DROP TABLE public.identity_provider_mapper;
       public         heap    postgres    false            �            1259    171863    idp_mapper_config    TABLE     �   CREATE TABLE public.idp_mapper_config (
    idp_mapper_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);
 %   DROP TABLE public.idp_mapper_config;
       public         heap    postgres    false            �            1259    171868    keycloak_group    TABLE     �   CREATE TABLE public.keycloak_group (
    id character varying(36) NOT NULL,
    name character varying(255),
    parent_group character varying(36) NOT NULL,
    realm_id character varying(36)
);
 "   DROP TABLE public.keycloak_group;
       public         heap    postgres    false                        1259    171871    keycloak_role    TABLE     b  CREATE TABLE public.keycloak_role (
    id character varying(36) NOT NULL,
    client_realm_constraint character varying(255),
    client_role boolean DEFAULT false NOT NULL,
    description character varying(255),
    name character varying(255),
    realm_id character varying(255),
    client character varying(36),
    realm character varying(36)
);
 !   DROP TABLE public.keycloak_role;
       public         heap    postgres    false                       1259    171877    migration_model    TABLE     �   CREATE TABLE public.migration_model (
    id character varying(36) NOT NULL,
    version character varying(36),
    update_time bigint DEFAULT 0 NOT NULL
);
 #   DROP TABLE public.migration_model;
       public         heap    postgres    false            :           1259    180170    notification    TABLE     �   CREATE TABLE public.notification (
    id_notification bigint NOT NULL,
    isread boolean,
    notification character varying(255),
    temp timestamp without time zone,
    id_destinataire character varying(255)
);
     DROP TABLE public.notification;
       public         heap    postgres    false            9           1259    180169     notification_id_notification_seq    SEQUENCE     �   CREATE SEQUENCE public.notification_id_notification_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.notification_id_notification_seq;
       public          postgres    false    314            :           0    0     notification_id_notification_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.notification_id_notification_seq OWNED BY public.notification.id_notification;
          public          postgres    false    313                       1259    171881    offline_client_session    TABLE     �  CREATE TABLE public.offline_client_session (
    user_session_id character varying(36) NOT NULL,
    client_id character varying(255) NOT NULL,
    offline_flag character varying(4) NOT NULL,
    "timestamp" integer,
    data text,
    client_storage_provider character varying(36) DEFAULT 'local'::character varying NOT NULL,
    external_client_id character varying(255) DEFAULT 'local'::character varying NOT NULL
);
 *   DROP TABLE public.offline_client_session;
       public         heap    postgres    false                       1259    171888    offline_user_session    TABLE     P  CREATE TABLE public.offline_user_session (
    user_session_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    created_on integer NOT NULL,
    offline_flag character varying(4) NOT NULL,
    data text,
    last_session_refresh integer DEFAULT 0 NOT NULL
);
 (   DROP TABLE public.offline_user_session;
       public         heap    postgres    false                       1259    171894    policy_config    TABLE     �   CREATE TABLE public.policy_config (
    policy_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value text
);
 !   DROP TABLE public.policy_config;
       public         heap    postgres    false            <           1259    180179    projet    TABLE        CREATE TABLE public.projet (
    id_projet bigint NOT NULL,
    date_creation timestamp without time zone,
    description text,
    etat character varying(255),
    nom character varying(255) NOT NULL,
    id_createur character varying(255),
    id_responsable character varying(255)
);
    DROP TABLE public.projet;
       public         heap    postgres    false            ;           1259    180178    projet_id_projet_seq    SEQUENCE     }   CREATE SEQUENCE public.projet_id_projet_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.projet_id_projet_seq;
       public          postgres    false    316            ;           0    0    projet_id_projet_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.projet_id_projet_seq OWNED BY public.projet.id_projet;
          public          postgres    false    315            D           1259    180333    projet_param    TABLE     �   CREATE TABLE public.projet_param (
    id bigint NOT NULL,
    creation boolean,
    delete boolean,
    read boolean,
    role character varying(255),
    update boolean
);
     DROP TABLE public.projet_param;
       public         heap    postgres    false            C           1259    180332    projet_param_id_seq    SEQUENCE     |   CREATE SEQUENCE public.projet_param_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.projet_param_id_seq;
       public          postgres    false    324            <           0    0    projet_param_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.projet_param_id_seq OWNED BY public.projet_param.id;
          public          postgres    false    323                       1259    171905    protocol_mapper    TABLE     1  CREATE TABLE public.protocol_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    protocol character varying(255) NOT NULL,
    protocol_mapper_name character varying(255) NOT NULL,
    client_id character varying(36),
    client_scope_id character varying(36)
);
 #   DROP TABLE public.protocol_mapper;
       public         heap    postgres    false                       1259    171910    protocol_mapper_config    TABLE     �   CREATE TABLE public.protocol_mapper_config (
    protocol_mapper_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);
 *   DROP TABLE public.protocol_mapper_config;
       public         heap    postgres    false                       1259    171915    realm    TABLE     �	  CREATE TABLE public.realm (
    id character varying(36) NOT NULL,
    access_code_lifespan integer,
    user_action_lifespan integer,
    access_token_lifespan integer,
    account_theme character varying(255),
    admin_theme character varying(255),
    email_theme character varying(255),
    enabled boolean DEFAULT false NOT NULL,
    events_enabled boolean DEFAULT false NOT NULL,
    events_expiration bigint,
    login_theme character varying(255),
    name character varying(255),
    not_before integer,
    password_policy character varying(2550),
    registration_allowed boolean DEFAULT false NOT NULL,
    remember_me boolean DEFAULT false NOT NULL,
    reset_password_allowed boolean DEFAULT false NOT NULL,
    social boolean DEFAULT false NOT NULL,
    ssl_required character varying(255),
    sso_idle_timeout integer,
    sso_max_lifespan integer,
    update_profile_on_soc_login boolean DEFAULT false NOT NULL,
    verify_email boolean DEFAULT false NOT NULL,
    master_admin_client character varying(36),
    login_lifespan integer,
    internationalization_enabled boolean DEFAULT false NOT NULL,
    default_locale character varying(255),
    reg_email_as_username boolean DEFAULT false NOT NULL,
    admin_events_enabled boolean DEFAULT false NOT NULL,
    admin_events_details_enabled boolean DEFAULT false NOT NULL,
    edit_username_allowed boolean DEFAULT false NOT NULL,
    otp_policy_counter integer DEFAULT 0,
    otp_policy_window integer DEFAULT 1,
    otp_policy_period integer DEFAULT 30,
    otp_policy_digits integer DEFAULT 6,
    otp_policy_alg character varying(36) DEFAULT 'HmacSHA1'::character varying,
    otp_policy_type character varying(36) DEFAULT 'totp'::character varying,
    browser_flow character varying(36),
    registration_flow character varying(36),
    direct_grant_flow character varying(36),
    reset_credentials_flow character varying(36),
    client_auth_flow character varying(36),
    offline_session_idle_timeout integer DEFAULT 0,
    revoke_refresh_token boolean DEFAULT false NOT NULL,
    access_token_life_implicit integer DEFAULT 0,
    login_with_email_allowed boolean DEFAULT true NOT NULL,
    duplicate_emails_allowed boolean DEFAULT false NOT NULL,
    docker_auth_flow character varying(36),
    refresh_token_max_reuse integer DEFAULT 0,
    allow_user_managed_access boolean DEFAULT false NOT NULL,
    sso_max_lifespan_remember_me integer DEFAULT 0 NOT NULL,
    sso_idle_timeout_remember_me integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.realm;
       public         heap    postgres    false                       1259    171948    realm_attribute    TABLE     �   CREATE TABLE public.realm_attribute (
    name character varying(255) NOT NULL,
    value character varying(255),
    realm_id character varying(36) NOT NULL
);
 #   DROP TABLE public.realm_attribute;
       public         heap    postgres    false            	           1259    171953    realm_default_groups    TABLE     �   CREATE TABLE public.realm_default_groups (
    realm_id character varying(36) NOT NULL,
    group_id character varying(36) NOT NULL
);
 (   DROP TABLE public.realm_default_groups;
       public         heap    postgres    false            
           1259    171956    realm_default_roles    TABLE     �   CREATE TABLE public.realm_default_roles (
    realm_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);
 '   DROP TABLE public.realm_default_roles;
       public         heap    postgres    false                       1259    171959    realm_enabled_event_types    TABLE     �   CREATE TABLE public.realm_enabled_event_types (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);
 -   DROP TABLE public.realm_enabled_event_types;
       public         heap    postgres    false                       1259    171962    realm_events_listeners    TABLE     �   CREATE TABLE public.realm_events_listeners (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);
 *   DROP TABLE public.realm_events_listeners;
       public         heap    postgres    false                       1259    171965    realm_localizations    TABLE     �   CREATE TABLE public.realm_localizations (
    realm_id character varying(255) NOT NULL,
    locale character varying(255) NOT NULL,
    texts text NOT NULL
);
 '   DROP TABLE public.realm_localizations;
       public         heap    postgres    false                       1259    171970    realm_required_credential    TABLE       CREATE TABLE public.realm_required_credential (
    type character varying(255) NOT NULL,
    form_label character varying(255),
    input boolean DEFAULT false NOT NULL,
    secret boolean DEFAULT false NOT NULL,
    realm_id character varying(36) NOT NULL
);
 -   DROP TABLE public.realm_required_credential;
       public         heap    postgres    false                       1259    171977    realm_smtp_config    TABLE     �   CREATE TABLE public.realm_smtp_config (
    realm_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);
 %   DROP TABLE public.realm_smtp_config;
       public         heap    postgres    false                       1259    171982    realm_supported_locales    TABLE     �   CREATE TABLE public.realm_supported_locales (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);
 +   DROP TABLE public.realm_supported_locales;
       public         heap    postgres    false                       1259    171985    redirect_uris    TABLE        CREATE TABLE public.redirect_uris (
    client_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);
 !   DROP TABLE public.redirect_uris;
       public         heap    postgres    false                       1259    171988    required_action_config    TABLE     �   CREATE TABLE public.required_action_config (
    required_action_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);
 *   DROP TABLE public.required_action_config;
       public         heap    postgres    false                       1259    171993    required_action_provider    TABLE     \  CREATE TABLE public.required_action_provider (
    id character varying(36) NOT NULL,
    alias character varying(255),
    name character varying(255),
    realm_id character varying(36),
    enabled boolean DEFAULT false NOT NULL,
    default_action boolean DEFAULT false NOT NULL,
    provider_id character varying(255),
    priority integer
);
 ,   DROP TABLE public.required_action_provider;
       public         heap    postgres    false                       1259    172000    resource_attribute    TABLE       CREATE TABLE public.resource_attribute (
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255),
    resource_id character varying(36) NOT NULL
);
 &   DROP TABLE public.resource_attribute;
       public         heap    postgres    false                       1259    172006    resource_policy    TABLE     �   CREATE TABLE public.resource_policy (
    resource_id character varying(36) NOT NULL,
    policy_id character varying(36) NOT NULL
);
 #   DROP TABLE public.resource_policy;
       public         heap    postgres    false                       1259    172009    resource_scope    TABLE     �   CREATE TABLE public.resource_scope (
    resource_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);
 "   DROP TABLE public.resource_scope;
       public         heap    postgres    false                       1259    172012    resource_server    TABLE     �   CREATE TABLE public.resource_server (
    id character varying(36) NOT NULL,
    allow_rs_remote_mgmt boolean DEFAULT false NOT NULL,
    policy_enforce_mode character varying(15) NOT NULL,
    decision_strategy smallint DEFAULT 1 NOT NULL
);
 #   DROP TABLE public.resource_server;
       public         heap    postgres    false                       1259    172017    resource_server_perm_ticket    TABLE     �  CREATE TABLE public.resource_server_perm_ticket (
    id character varying(36) NOT NULL,
    owner character varying(255) NOT NULL,
    requester character varying(255) NOT NULL,
    created_timestamp bigint NOT NULL,
    granted_timestamp bigint,
    resource_id character varying(36) NOT NULL,
    scope_id character varying(36),
    resource_server_id character varying(36) NOT NULL,
    policy_id character varying(36)
);
 /   DROP TABLE public.resource_server_perm_ticket;
       public         heap    postgres    false                       1259    172022    resource_server_policy    TABLE     y  CREATE TABLE public.resource_server_policy (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255) NOT NULL,
    decision_strategy character varying(20),
    logic character varying(20),
    resource_server_id character varying(36) NOT NULL,
    owner character varying(255)
);
 *   DROP TABLE public.resource_server_policy;
       public         heap    postgres    false                       1259    172027    resource_server_resource    TABLE     �  CREATE TABLE public.resource_server_resource (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255),
    icon_uri character varying(255),
    owner character varying(255) NOT NULL,
    resource_server_id character varying(36) NOT NULL,
    owner_managed_access boolean DEFAULT false NOT NULL,
    display_name character varying(255)
);
 ,   DROP TABLE public.resource_server_resource;
       public         heap    postgres    false                       1259    172033    resource_server_scope    TABLE       CREATE TABLE public.resource_server_scope (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    icon_uri character varying(255),
    resource_server_id character varying(36) NOT NULL,
    display_name character varying(255)
);
 )   DROP TABLE public.resource_server_scope;
       public         heap    postgres    false                       1259    172038    resource_uris    TABLE     �   CREATE TABLE public.resource_uris (
    resource_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);
 !   DROP TABLE public.resource_uris;
       public         heap    postgres    false                       1259    172041    role_attribute    TABLE     �   CREATE TABLE public.role_attribute (
    id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255)
);
 "   DROP TABLE public.role_attribute;
       public         heap    postgres    false                       1259    172046    scope_mapping    TABLE     �   CREATE TABLE public.scope_mapping (
    client_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);
 !   DROP TABLE public.scope_mapping;
       public         heap    postgres    false                       1259    172049    scope_policy    TABLE     �   CREATE TABLE public.scope_policy (
    scope_id character varying(36) NOT NULL,
    policy_id character varying(36) NOT NULL
);
     DROP TABLE public.scope_policy;
       public         heap    postgres    false            >           1259    180188 	   soustache    TABLE     J  CREATE TABLE public.soustache (
    id_soustache bigint NOT NULL,
    date_creation timestamp without time zone,
    description text,
    etat character varying(255),
    nom character varying(255),
    id_sprint bigint,
    id_tache bigint,
    id_responsable character varying(255),
    id_rapporteur character varying(255)
);
    DROP TABLE public.soustache;
       public         heap    postgres    false            =           1259    180187    soustache_id_soustache_seq    SEQUENCE     �   CREATE SEQUENCE public.soustache_id_soustache_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.soustache_id_soustache_seq;
       public          postgres    false    318            =           0    0    soustache_id_soustache_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.soustache_id_soustache_seq OWNED BY public.soustache.id_soustache;
          public          postgres    false    317            F           1259    180340    soustache_param    TABLE     �   CREATE TABLE public.soustache_param (
    id bigint NOT NULL,
    creation boolean,
    delete boolean,
    read boolean,
    role character varying(255),
    update boolean
);
 #   DROP TABLE public.soustache_param;
       public         heap    postgres    false            E           1259    180339    soustache_param_id_seq    SEQUENCE        CREATE SEQUENCE public.soustache_param_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.soustache_param_id_seq;
       public          postgres    false    326            >           0    0    soustache_param_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.soustache_param_id_seq OWNED BY public.soustache_param.id;
          public          postgres    false    325            @           1259    180197    sprint    TABLE     _  CREATE TABLE public.sprint (
    id_sprint bigint NOT NULL,
    date_debut timestamp without time zone,
    date_fin timestamp without time zone,
    etat character varying(255),
    nom character varying(255),
    objectif character varying(255),
    idcreateur character varying(255),
    id_projet bigint,
    id_createur character varying(255)
);
    DROP TABLE public.sprint;
       public         heap    postgres    false            ?           1259    180196    sprint_id_sprint_seq    SEQUENCE     }   CREATE SEQUENCE public.sprint_id_sprint_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.sprint_id_sprint_seq;
       public          postgres    false    320            ?           0    0    sprint_id_sprint_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.sprint_id_sprint_seq OWNED BY public.sprint.id_sprint;
          public          postgres    false    319            H           1259    180347    sprint_param    TABLE     �   CREATE TABLE public.sprint_param (
    id bigint NOT NULL,
    creation boolean,
    delete boolean,
    read boolean,
    role character varying(255),
    update boolean
);
     DROP TABLE public.sprint_param;
       public         heap    postgres    false            G           1259    180346    sprint_param_id_seq    SEQUENCE     |   CREATE SEQUENCE public.sprint_param_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.sprint_param_id_seq;
       public          postgres    false    328            @           0    0    sprint_param_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.sprint_param_id_seq OWNED BY public.sprint_param.id;
          public          postgres    false    327            B           1259    180206    tache    TABLE     x  CREATE TABLE public.tache (
    id_tache bigint NOT NULL,
    couleur character varying(255),
    date_debut timestamp without time zone,
    date_fin timestamp without time zone,
    description text,
    etat character varying(255),
    nom character varying(255),
    id_projet bigint,
    id_responsable character varying(255),
    id_rapporteur character varying(255)
);
    DROP TABLE public.tache;
       public         heap    postgres    false            A           1259    180205    tache_id_tache_seq    SEQUENCE     {   CREATE SEQUENCE public.tache_id_tache_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tache_id_tache_seq;
       public          postgres    false    322            A           0    0    tache_id_tache_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tache_id_tache_seq OWNED BY public.tache.id_tache;
          public          postgres    false    321            J           1259    180354    tache_param    TABLE     �   CREATE TABLE public.tache_param (
    id bigint NOT NULL,
    creation boolean,
    delete boolean,
    read boolean,
    role character varying(255),
    update boolean
);
    DROP TABLE public.tache_param;
       public         heap    postgres    false            I           1259    180353    tache_param_id_seq    SEQUENCE     {   CREATE SEQUENCE public.tache_param_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tache_param_id_seq;
       public          postgres    false    330            B           0    0    tache_param_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tache_param_id_seq OWNED BY public.tache_param.id;
          public          postgres    false    329                        1259    172058    user_attribute    TABLE     �   CREATE TABLE public.user_attribute (
    name character varying(255) NOT NULL,
    value character varying(255),
    user_id character varying(36) NOT NULL,
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL
);
 "   DROP TABLE public.user_attribute;
       public         heap    postgres    false            !           1259    172064    user_consent    TABLE     7  CREATE TABLE public.user_consent (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    user_id character varying(36) NOT NULL,
    created_date bigint,
    last_updated_date bigint,
    client_storage_provider character varying(36),
    external_client_id character varying(255)
);
     DROP TABLE public.user_consent;
       public         heap    postgres    false            "           1259    172069    user_consent_client_scope    TABLE     �   CREATE TABLE public.user_consent_client_scope (
    user_consent_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);
 -   DROP TABLE public.user_consent_client_scope;
       public         heap    postgres    false            #           1259    172072    user_entity    TABLE     =  CREATE TABLE public.user_entity (
    id character varying(36) NOT NULL,
    email character varying(255),
    email_constraint character varying(255),
    email_verified boolean DEFAULT false NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    federation_link character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    realm_id character varying(255),
    username character varying(255),
    created_timestamp bigint,
    service_account_client_link character varying(255),
    not_before integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.user_entity;
       public         heap    postgres    false            $           1259    172080    user_federation_config    TABLE     �   CREATE TABLE public.user_federation_config (
    user_federation_provider_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);
 *   DROP TABLE public.user_federation_config;
       public         heap    postgres    false            %           1259    172085    user_federation_mapper    TABLE     $  CREATE TABLE public.user_federation_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    federation_provider_id character varying(36) NOT NULL,
    federation_mapper_type character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL
);
 *   DROP TABLE public.user_federation_mapper;
       public         heap    postgres    false            &           1259    172090    user_federation_mapper_config    TABLE     �   CREATE TABLE public.user_federation_mapper_config (
    user_federation_mapper_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);
 1   DROP TABLE public.user_federation_mapper_config;
       public         heap    postgres    false            '           1259    172095    user_federation_provider    TABLE     ;  CREATE TABLE public.user_federation_provider (
    id character varying(36) NOT NULL,
    changed_sync_period integer,
    display_name character varying(255),
    full_sync_period integer,
    last_sync integer,
    priority integer,
    provider_name character varying(255),
    realm_id character varying(36)
);
 ,   DROP TABLE public.user_federation_provider;
       public         heap    postgres    false            (           1259    172100    user_group_membership    TABLE     �   CREATE TABLE public.user_group_membership (
    group_id character varying(36) NOT NULL,
    user_id character varying(36) NOT NULL
);
 )   DROP TABLE public.user_group_membership;
       public         heap    postgres    false            )           1259    172103    user_required_action    TABLE     �   CREATE TABLE public.user_required_action (
    user_id character varying(36) NOT NULL,
    required_action character varying(255) DEFAULT ' '::character varying NOT NULL
);
 (   DROP TABLE public.user_required_action;
       public         heap    postgres    false            *           1259    172107    user_role_mapping    TABLE     �   CREATE TABLE public.user_role_mapping (
    role_id character varying(255) NOT NULL,
    user_id character varying(36) NOT NULL
);
 %   DROP TABLE public.user_role_mapping;
       public         heap    postgres    false            +           1259    172110    user_session    TABLE     �  CREATE TABLE public.user_session (
    id character varying(36) NOT NULL,
    auth_method character varying(255),
    ip_address character varying(255),
    last_session_refresh integer,
    login_username character varying(255),
    realm_id character varying(255),
    remember_me boolean DEFAULT false NOT NULL,
    started integer,
    user_id character varying(255),
    user_session_state integer,
    broker_session_id character varying(255),
    broker_user_id character varying(255)
);
     DROP TABLE public.user_session;
       public         heap    postgres    false            ,           1259    172116    user_session_note    TABLE     �   CREATE TABLE public.user_session_note (
    user_session character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(2048)
);
 %   DROP TABLE public.user_session_note;
       public         heap    postgres    false            -           1259    172121    username_login_failure    TABLE       CREATE TABLE public.username_login_failure (
    realm_id character varying(36) NOT NULL,
    username character varying(255) NOT NULL,
    failed_login_not_before integer,
    last_failure bigint,
    last_ip_failure character varying(255),
    num_failures integer
);
 *   DROP TABLE public.username_login_failure;
       public         heap    postgres    false            .           1259    172126    web_origins    TABLE     }   CREATE TABLE public.web_origins (
    client_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);
    DROP TABLE public.web_origins;
       public         heap    postgres    false            d           2604    180127    commentaire id_commentaire    DEFAULT     �   ALTER TABLE ONLY public.commentaire ALTER COLUMN id_commentaire SET DEFAULT nextval('public.commentaire_id_commentaire_seq'::regclass);
 I   ALTER TABLE public.commentaire ALTER COLUMN id_commentaire DROP DEFAULT;
       public          postgres    false    303    304    304            e           2604    180136    etat_projet id    DEFAULT     p   ALTER TABLE ONLY public.etat_projet ALTER COLUMN id SET DEFAULT nextval('public.etat_projet_id_seq'::regclass);
 =   ALTER TABLE public.etat_projet ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    305    306    306            f           2604    180143    etat_soustache id    DEFAULT     v   ALTER TABLE ONLY public.etat_soustache ALTER COLUMN id SET DEFAULT nextval('public.etat_soustache_id_seq'::regclass);
 @   ALTER TABLE public.etat_soustache ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    307    308    308            g           2604    180150    etat_sprint id    DEFAULT     p   ALTER TABLE ONLY public.etat_sprint ALTER COLUMN id SET DEFAULT nextval('public.etat_sprint_id_seq'::regclass);
 =   ALTER TABLE public.etat_sprint ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    309    310    310            h           2604    180157    etat_tache id    DEFAULT     n   ALTER TABLE ONLY public.etat_tache ALTER COLUMN id SET DEFAULT nextval('public.etat_tache_id_seq'::regclass);
 <   ALTER TABLE public.etat_tache ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    312    311    312            r           2604    188617    fichier id_fichier    DEFAULT     x   ALTER TABLE ONLY public.fichier ALTER COLUMN id_fichier SET DEFAULT nextval('public.fichier_id_fichier_seq'::regclass);
 A   ALTER TABLE public.fichier ALTER COLUMN id_fichier DROP DEFAULT;
       public          postgres    false    331    332    332            i           2604    180173    notification id_notification    DEFAULT     �   ALTER TABLE ONLY public.notification ALTER COLUMN id_notification SET DEFAULT nextval('public.notification_id_notification_seq'::regclass);
 K   ALTER TABLE public.notification ALTER COLUMN id_notification DROP DEFAULT;
       public          postgres    false    314    313    314            j           2604    180182    projet id_projet    DEFAULT     t   ALTER TABLE ONLY public.projet ALTER COLUMN id_projet SET DEFAULT nextval('public.projet_id_projet_seq'::regclass);
 ?   ALTER TABLE public.projet ALTER COLUMN id_projet DROP DEFAULT;
       public          postgres    false    315    316    316            n           2604    180336    projet_param id    DEFAULT     r   ALTER TABLE ONLY public.projet_param ALTER COLUMN id SET DEFAULT nextval('public.projet_param_id_seq'::regclass);
 >   ALTER TABLE public.projet_param ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    323    324    324            k           2604    180191    soustache id_soustache    DEFAULT     �   ALTER TABLE ONLY public.soustache ALTER COLUMN id_soustache SET DEFAULT nextval('public.soustache_id_soustache_seq'::regclass);
 E   ALTER TABLE public.soustache ALTER COLUMN id_soustache DROP DEFAULT;
       public          postgres    false    318    317    318            o           2604    180343    soustache_param id    DEFAULT     x   ALTER TABLE ONLY public.soustache_param ALTER COLUMN id SET DEFAULT nextval('public.soustache_param_id_seq'::regclass);
 A   ALTER TABLE public.soustache_param ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    325    326    326            l           2604    180200    sprint id_sprint    DEFAULT     t   ALTER TABLE ONLY public.sprint ALTER COLUMN id_sprint SET DEFAULT nextval('public.sprint_id_sprint_seq'::regclass);
 ?   ALTER TABLE public.sprint ALTER COLUMN id_sprint DROP DEFAULT;
       public          postgres    false    319    320    320            p           2604    180350    sprint_param id    DEFAULT     r   ALTER TABLE ONLY public.sprint_param ALTER COLUMN id SET DEFAULT nextval('public.sprint_param_id_seq'::regclass);
 >   ALTER TABLE public.sprint_param ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    327    328    328            m           2604    180209    tache id_tache    DEFAULT     p   ALTER TABLE ONLY public.tache ALTER COLUMN id_tache SET DEFAULT nextval('public.tache_id_tache_seq'::regclass);
 =   ALTER TABLE public.tache ALTER COLUMN id_tache DROP DEFAULT;
       public          postgres    false    322    321    322            q           2604    180357    tache_param id    DEFAULT     p   ALTER TABLE ONLY public.tache_param ALTER COLUMN id SET DEFAULT nextval('public.tache_param_id_seq'::regclass);
 =   ALTER TABLE public.tache_param ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    329    330    330            �          0    171649    admin_event_entity 
   TABLE DATA           �   COPY public.admin_event_entity (id, admin_event_time, realm_id, operation_type, auth_realm_id, auth_client_id, auth_user_id, ip_address, resource_path, representation, error, resource_type) FROM stdin;
    public          postgres    false    209   +      �          0    171654    associated_policy 
   TABLE DATA           L   COPY public.associated_policy (policy_id, associated_policy_id) FROM stdin;
    public          postgres    false    210   +      �          0    171657    authentication_execution 
   TABLE DATA           �   COPY public.authentication_execution (id, alias, authenticator, realm_id, flow_id, requirement, priority, authenticator_flow, auth_flow_id, auth_config) FROM stdin;
    public          postgres    false    211   <+      �          0    171661    authentication_flow 
   TABLE DATA           q   COPY public.authentication_flow (id, alias, description, realm_id, provider_id, top_level, built_in) FROM stdin;
    public          postgres    false    212   �;      �          0    171669    authenticator_config 
   TABLE DATA           C   COPY public.authenticator_config (id, alias, realm_id) FROM stdin;
    public          postgres    false    213   �B      �          0    171672    authenticator_config_entry 
   TABLE DATA           S   COPY public.authenticator_config_entry (authenticator_id, value, name) FROM stdin;
    public          postgres    false    214   OC      �          0    171677    broker_link 
   TABLE DATA           �   COPY public.broker_link (identity_provider, storage_provider_id, realm_id, broker_user_id, broker_username, token, user_id) FROM stdin;
    public          postgres    false    215   D      �          0    171682    client 
   TABLE DATA           �  COPY public.client (id, enabled, full_scope_allowed, client_id, not_before, public_client, secret, base_url, bearer_only, management_url, surrogate_auth_required, realm_id, protocol, node_rereg_timeout, frontchannel_logout, consent_required, name, service_accounts_enabled, client_authenticator_type, root_url, description, registration_token, standard_flow_enabled, implicit_flow_enabled, direct_access_grants_enabled, always_display_in_console) FROM stdin;
    public          postgres    false    216   9D      �          0    171700    client_attributes 
   TABLE DATA           C   COPY public.client_attributes (client_id, value, name) FROM stdin;
    public          postgres    false    217   /H      �          0    171705    client_auth_flow_bindings 
   TABLE DATA           U   COPY public.client_auth_flow_bindings (client_id, flow_id, binding_name) FROM stdin;
    public          postgres    false    218   J      �          0    171708    client_default_roles 
   TABLE DATA           B   COPY public.client_default_roles (client_id, role_id) FROM stdin;
    public          postgres    false    219   !J      �          0    171711    client_initial_access 
   TABLE DATA           n   COPY public.client_initial_access (id, realm_id, "timestamp", expiration, count, remaining_count) FROM stdin;
    public          postgres    false    220   �J      �          0    171714    client_node_registrations 
   TABLE DATA           K   COPY public.client_node_registrations (client_id, value, name) FROM stdin;
    public          postgres    false    221   �J      �          0    171717    client_scope 
   TABLE DATA           Q   COPY public.client_scope (id, name, realm_id, description, protocol) FROM stdin;
    public          postgres    false    222   K      �          0    171722    client_scope_attributes 
   TABLE DATA           H   COPY public.client_scope_attributes (scope_id, value, name) FROM stdin;
    public          postgres    false    223   �M      �          0    171727    client_scope_client 
   TABLE DATA           Q   COPY public.client_scope_client (client_id, scope_id, default_scope) FROM stdin;
    public          postgres    false    224   �P      �          0    171731    client_scope_role_mapping 
   TABLE DATA           F   COPY public.client_scope_role_mapping (scope_id, role_id) FROM stdin;
    public          postgres    false    225   TU      �          0    171734    client_session 
   TABLE DATA           �   COPY public.client_session (id, client_id, redirect_uri, state, "timestamp", session_id, auth_method, realm_id, auth_user_id, current_action) FROM stdin;
    public          postgres    false    226   �U      �          0    171739    client_session_auth_status 
   TABLE DATA           [   COPY public.client_session_auth_status (authenticator, status, client_session) FROM stdin;
    public          postgres    false    227   �U      �          0    171742    client_session_note 
   TABLE DATA           J   COPY public.client_session_note (name, value, client_session) FROM stdin;
    public          postgres    false    228   V      �          0    171747    client_session_prot_mapper 
   TABLE DATA           X   COPY public.client_session_prot_mapper (protocol_mapper_id, client_session) FROM stdin;
    public          postgres    false    229   -V      �          0    171750    client_session_role 
   TABLE DATA           F   COPY public.client_session_role (role_id, client_session) FROM stdin;
    public          postgres    false    230   JV      �          0    171753    client_user_session_note 
   TABLE DATA           O   COPY public.client_user_session_note (name, value, client_session) FROM stdin;
    public          postgres    false    231   gV                0    180124    commentaire 
   TABLE DATA           m   COPY public.commentaire (id_commentaire, commentaire, temp, id_soustache, id_tache, id_createur) FROM stdin;
    public          postgres    false    304   �V      �          0    171758 	   component 
   TABLE DATA           h   COPY public.component (id, name, parent_id, provider_id, provider_type, realm_id, sub_type) FROM stdin;
    public          postgres    false    232   W      �          0    171763    component_config 
   TABLE DATA           I   COPY public.component_config (id, component_id, name, value) FROM stdin;
    public          postgres    false    233   �Z      �          0    171768    composite_role 
   TABLE DATA           ?   COPY public.composite_role (composite, child_role) FROM stdin;
    public          postgres    false    234   �s      �          0    171771 
   credential 
   TABLE DATA              COPY public.credential (id, salt, type, user_id, created_date, user_label, secret_data, credential_data, priority) FROM stdin;
    public          postgres    false    235   �z      �          0    171776    databasechangelog 
   TABLE DATA           �   COPY public.databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
    public          postgres    false    236   �      �          0    171781    databasechangeloglock 
   TABLE DATA           R   COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
    public          postgres    false    237   N�      �          0    171784    default_client_scope 
   TABLE DATA           Q   COPY public.default_client_scope (realm_id, scope_id, default_scope) FROM stdin;
    public          postgres    false    238   |�                0    180133    etat_projet 
   TABLE DATA           .   COPY public.etat_projet (id, nom) FROM stdin;
    public          postgres    false    306   [�                0    180140    etat_soustache 
   TABLE DATA           1   COPY public.etat_soustache (id, nom) FROM stdin;
    public          postgres    false    308   x�                0    180147    etat_sprint 
   TABLE DATA           .   COPY public.etat_sprint (id, nom) FROM stdin;
    public          postgres    false    310   ��                0    180154 
   etat_tache 
   TABLE DATA           -   COPY public.etat_tache (id, nom) FROM stdin;
    public          postgres    false    312   ��      �          0    171788    event_entity 
   TABLE DATA           �   COPY public.event_entity (id, client_id, details_json, error, ip_address, realm_id, session_id, event_time, type, user_id) FROM stdin;
    public          postgres    false    239   ϙ      �          0    171793    fed_user_attribute 
   TABLE DATA           e   COPY public.fed_user_attribute (id, name, user_id, realm_id, storage_provider_id, value) FROM stdin;
    public          postgres    false    240   �      �          0    171798    fed_user_consent 
   TABLE DATA           �   COPY public.fed_user_consent (id, client_id, user_id, realm_id, storage_provider_id, created_date, last_updated_date, client_storage_provider, external_client_id) FROM stdin;
    public          postgres    false    241   	�      �          0    171803    fed_user_consent_cl_scope 
   TABLE DATA           N   COPY public.fed_user_consent_cl_scope (user_consent_id, scope_id) FROM stdin;
    public          postgres    false    242   &�      �          0    171806    fed_user_credential 
   TABLE DATA           �   COPY public.fed_user_credential (id, salt, type, created_date, user_id, realm_id, storage_provider_id, user_label, secret_data, credential_data, priority) FROM stdin;
    public          postgres    false    243   C�      �          0    171811    fed_user_group_membership 
   TABLE DATA           e   COPY public.fed_user_group_membership (group_id, user_id, realm_id, storage_provider_id) FROM stdin;
    public          postgres    false    244   `�      �          0    171814    fed_user_required_action 
   TABLE DATA           k   COPY public.fed_user_required_action (required_action, user_id, realm_id, storage_provider_id) FROM stdin;
    public          postgres    false    245   }�      �          0    171820    fed_user_role_mapping 
   TABLE DATA           `   COPY public.fed_user_role_mapping (role_id, user_id, realm_id, storage_provider_id) FROM stdin;
    public          postgres    false    246   ��      �          0    171823    federated_identity 
   TABLE DATA           �   COPY public.federated_identity (identity_provider, realm_id, federated_user_id, federated_username, token, user_id) FROM stdin;
    public          postgres    false    247   ��      �          0    171828    federated_user 
   TABLE DATA           K   COPY public.federated_user (id, storage_provider_id, realm_id) FROM stdin;
    public          postgres    false    248   Ԛ      -          0    188614    fichier 
   TABLE DATA           m   COPY public.fichier (id_fichier, chemin, date_creation, nom, id_commentaire, id_projet, id_user) FROM stdin;
    public          postgres    false    332   �      �          0    171833    group_attribute 
   TABLE DATA           D   COPY public.group_attribute (id, name, value, group_id) FROM stdin;
    public          postgres    false    249   �      �          0    171839    group_role_mapping 
   TABLE DATA           ?   COPY public.group_role_mapping (role_id, group_id) FROM stdin;
    public          postgres    false    250   �      �          0    171842    identity_provider 
   TABLE DATA             COPY public.identity_provider (internal_id, enabled, provider_alias, provider_id, store_token, authenticate_by_default, realm_id, add_token_role, trust_email, first_broker_login_flow_id, post_broker_login_flow_id, provider_display_name, link_only) FROM stdin;
    public          postgres    false    251   )�      �          0    171853    identity_provider_config 
   TABLE DATA           U   COPY public.identity_provider_config (identity_provider_id, value, name) FROM stdin;
    public          postgres    false    252   F�      �          0    171858    identity_provider_mapper 
   TABLE DATA           b   COPY public.identity_provider_mapper (id, name, idp_alias, idp_mapper_name, realm_id) FROM stdin;
    public          postgres    false    253   c�      �          0    171863    idp_mapper_config 
   TABLE DATA           G   COPY public.idp_mapper_config (idp_mapper_id, value, name) FROM stdin;
    public          postgres    false    254   ��      �          0    171868    keycloak_group 
   TABLE DATA           J   COPY public.keycloak_group (id, name, parent_group, realm_id) FROM stdin;
    public          postgres    false    255   ��      �          0    171871    keycloak_role 
   TABLE DATA           }   COPY public.keycloak_role (id, client_realm_constraint, client_role, description, name, realm_id, client, realm) FROM stdin;
    public          postgres    false    256   �      �          0    171877    migration_model 
   TABLE DATA           C   COPY public.migration_model (id, version, update_time) FROM stdin;
    public          postgres    false    257   �                0    180170    notification 
   TABLE DATA           d   COPY public.notification (id_notification, isread, notification, temp, id_destinataire) FROM stdin;
    public          postgres    false    314   &�      �          0    171881    offline_client_session 
   TABLE DATA           �   COPY public.offline_client_session (user_session_id, client_id, offline_flag, "timestamp", data, client_storage_provider, external_client_id) FROM stdin;
    public          postgres    false    258   ��      �          0    171888    offline_user_session 
   TABLE DATA           �   COPY public.offline_user_session (user_session_id, user_id, realm_id, created_on, offline_flag, data, last_session_refresh) FROM stdin;
    public          postgres    false    259   g�      �          0    171894    policy_config 
   TABLE DATA           ?   COPY public.policy_config (policy_id, name, value) FROM stdin;
    public          postgres    false    260   ��                0    180179    projet 
   TABLE DATA           o   COPY public.projet (id_projet, date_creation, description, etat, nom, id_createur, id_responsable) FROM stdin;
    public          postgres    false    316   ��      %          0    180333    projet_param 
   TABLE DATA           P   COPY public.projet_param (id, creation, delete, read, role, update) FROM stdin;
    public          postgres    false    324   ��      �          0    171905    protocol_mapper 
   TABLE DATA           o   COPY public.protocol_mapper (id, name, protocol, protocol_mapper_name, client_id, client_scope_id) FROM stdin;
    public          postgres    false    261   �      �          0    171910    protocol_mapper_config 
   TABLE DATA           Q   COPY public.protocol_mapper_config (protocol_mapper_id, value, name) FROM stdin;
    public          postgres    false    262   C�      �          0    171915    realm 
   TABLE DATA             COPY public.realm (id, access_code_lifespan, user_action_lifespan, access_token_lifespan, account_theme, admin_theme, email_theme, enabled, events_enabled, events_expiration, login_theme, name, not_before, password_policy, registration_allowed, remember_me, reset_password_allowed, social, ssl_required, sso_idle_timeout, sso_max_lifespan, update_profile_on_soc_login, verify_email, master_admin_client, login_lifespan, internationalization_enabled, default_locale, reg_email_as_username, admin_events_enabled, admin_events_details_enabled, edit_username_allowed, otp_policy_counter, otp_policy_window, otp_policy_period, otp_policy_digits, otp_policy_alg, otp_policy_type, browser_flow, registration_flow, direct_grant_flow, reset_credentials_flow, client_auth_flow, offline_session_idle_timeout, revoke_refresh_token, access_token_life_implicit, login_with_email_allowed, duplicate_emails_allowed, docker_auth_flow, refresh_token_max_reuse, allow_user_managed_access, sso_max_lifespan_remember_me, sso_idle_timeout_remember_me) FROM stdin;
    public          postgres    false    263   L�      �          0    171948    realm_attribute 
   TABLE DATA           @   COPY public.realm_attribute (name, value, realm_id) FROM stdin;
    public          postgres    false    264   &�      �          0    171953    realm_default_groups 
   TABLE DATA           B   COPY public.realm_default_groups (realm_id, group_id) FROM stdin;
    public          postgres    false    265   Q�      �          0    171956    realm_default_roles 
   TABLE DATA           @   COPY public.realm_default_roles (realm_id, role_id) FROM stdin;
    public          postgres    false    266   n�      �          0    171959    realm_enabled_event_types 
   TABLE DATA           D   COPY public.realm_enabled_event_types (realm_id, value) FROM stdin;
    public          postgres    false    267   �      �          0    171962    realm_events_listeners 
   TABLE DATA           A   COPY public.realm_events_listeners (realm_id, value) FROM stdin;
    public          postgres    false    268   +�      �          0    171965    realm_localizations 
   TABLE DATA           F   COPY public.realm_localizations (realm_id, locale, texts) FROM stdin;
    public          postgres    false    269   i�      �          0    171970    realm_required_credential 
   TABLE DATA           ^   COPY public.realm_required_credential (type, form_label, input, secret, realm_id) FROM stdin;
    public          postgres    false    270   ��      �          0    171977    realm_smtp_config 
   TABLE DATA           B   COPY public.realm_smtp_config (realm_id, value, name) FROM stdin;
    public          postgres    false    271   ��      �          0    171982    realm_supported_locales 
   TABLE DATA           B   COPY public.realm_supported_locales (realm_id, value) FROM stdin;
    public          postgres    false    272   ��      �          0    171985    redirect_uris 
   TABLE DATA           9   COPY public.redirect_uris (client_id, value) FROM stdin;
    public          postgres    false    273   �      �          0    171988    required_action_config 
   TABLE DATA           Q   COPY public.required_action_config (required_action_id, value, name) FROM stdin;
    public          postgres    false    274   $�      �          0    171993    required_action_provider 
   TABLE DATA           }   COPY public.required_action_provider (id, alias, name, realm_id, enabled, default_action, provider_id, priority) FROM stdin;
    public          postgres    false    275   A�      �          0    172000    resource_attribute 
   TABLE DATA           J   COPY public.resource_attribute (id, name, value, resource_id) FROM stdin;
    public          postgres    false    276   ��      �          0    172006    resource_policy 
   TABLE DATA           A   COPY public.resource_policy (resource_id, policy_id) FROM stdin;
    public          postgres    false    277   ��      �          0    172009    resource_scope 
   TABLE DATA           ?   COPY public.resource_scope (resource_id, scope_id) FROM stdin;
    public          postgres    false    278   �      �          0    172012    resource_server 
   TABLE DATA           k   COPY public.resource_server (id, allow_rs_remote_mgmt, policy_enforce_mode, decision_strategy) FROM stdin;
    public          postgres    false    279   �      �          0    172017    resource_server_perm_ticket 
   TABLE DATA           �   COPY public.resource_server_perm_ticket (id, owner, requester, created_timestamp, granted_timestamp, resource_id, scope_id, resource_server_id, policy_id) FROM stdin;
    public          postgres    false    280   ;�      �          0    172022    resource_server_policy 
   TABLE DATA           �   COPY public.resource_server_policy (id, name, description, type, decision_strategy, logic, resource_server_id, owner) FROM stdin;
    public          postgres    false    281   X�      �          0    172027    resource_server_resource 
   TABLE DATA           �   COPY public.resource_server_resource (id, name, type, icon_uri, owner, resource_server_id, owner_managed_access, display_name) FROM stdin;
    public          postgres    false    282   u�      �          0    172033    resource_server_scope 
   TABLE DATA           e   COPY public.resource_server_scope (id, name, icon_uri, resource_server_id, display_name) FROM stdin;
    public          postgres    false    283   ��      �          0    172038    resource_uris 
   TABLE DATA           ;   COPY public.resource_uris (resource_id, value) FROM stdin;
    public          postgres    false    284   ��      �          0    172041    role_attribute 
   TABLE DATA           B   COPY public.role_attribute (id, role_id, name, value) FROM stdin;
    public          postgres    false    285   ��      �          0    172046    scope_mapping 
   TABLE DATA           ;   COPY public.scope_mapping (client_id, role_id) FROM stdin;
    public          postgres    false    286   ��                 0    172049    scope_policy 
   TABLE DATA           ;   COPY public.scope_policy (scope_id, policy_id) FROM stdin;
    public          postgres    false    287   k�                0    180188 	   soustache 
   TABLE DATA           �   COPY public.soustache (id_soustache, date_creation, description, etat, nom, id_sprint, id_tache, id_responsable, id_rapporteur) FROM stdin;
    public          postgres    false    318   ��      '          0    180340    soustache_param 
   TABLE DATA           S   COPY public.soustache_param (id, creation, delete, read, role, update) FROM stdin;
    public          postgres    false    326   7�      !          0    180197    sprint 
   TABLE DATA           z   COPY public.sprint (id_sprint, date_debut, date_fin, etat, nom, objectif, idcreateur, id_projet, id_createur) FROM stdin;
    public          postgres    false    320   ��      )          0    180347    sprint_param 
   TABLE DATA           P   COPY public.sprint_param (id, creation, delete, read, role, update) FROM stdin;
    public          postgres    false    328   c�      #          0    180206    tache 
   TABLE DATA           �   COPY public.tache (id_tache, couleur, date_debut, date_fin, description, etat, nom, id_projet, id_responsable, id_rapporteur) FROM stdin;
    public          postgres    false    322   ��      +          0    180354    tache_param 
   TABLE DATA           O   COPY public.tache_param (id, creation, delete, read, role, update) FROM stdin;
    public          postgres    false    330   ��                0    172058    user_attribute 
   TABLE DATA           B   COPY public.user_attribute (name, value, user_id, id) FROM stdin;
    public          postgres    false    288   A�                0    172064    user_consent 
   TABLE DATA           �   COPY public.user_consent (id, client_id, user_id, created_date, last_updated_date, client_storage_provider, external_client_id) FROM stdin;
    public          postgres    false    289   ^�                0    172069    user_consent_client_scope 
   TABLE DATA           N   COPY public.user_consent_client_scope (user_consent_id, scope_id) FROM stdin;
    public          postgres    false    290   {�                0    172072    user_entity 
   TABLE DATA           �   COPY public.user_entity (id, email, email_constraint, email_verified, enabled, federation_link, first_name, last_name, realm_id, username, created_timestamp, service_account_client_link, not_before) FROM stdin;
    public          postgres    false    291   ��                0    172080    user_federation_config 
   TABLE DATA           Z   COPY public.user_federation_config (user_federation_provider_id, value, name) FROM stdin;
    public          postgres    false    292   T�                0    172085    user_federation_mapper 
   TABLE DATA           t   COPY public.user_federation_mapper (id, name, federation_provider_id, federation_mapper_type, realm_id) FROM stdin;
    public          postgres    false    293   q�                0    172090    user_federation_mapper_config 
   TABLE DATA           _   COPY public.user_federation_mapper_config (user_federation_mapper_id, value, name) FROM stdin;
    public          postgres    false    294   ��                0    172095    user_federation_provider 
   TABLE DATA           �   COPY public.user_federation_provider (id, changed_sync_period, display_name, full_sync_period, last_sync, priority, provider_name, realm_id) FROM stdin;
    public          postgres    false    295   ��      	          0    172100    user_group_membership 
   TABLE DATA           B   COPY public.user_group_membership (group_id, user_id) FROM stdin;
    public          postgres    false    296   ��      
          0    172103    user_required_action 
   TABLE DATA           H   COPY public.user_required_action (user_id, required_action) FROM stdin;
    public          postgres    false    297   ��                0    172107    user_role_mapping 
   TABLE DATA           =   COPY public.user_role_mapping (role_id, user_id) FROM stdin;
    public          postgres    false    298   �                0    172110    user_session 
   TABLE DATA           �   COPY public.user_session (id, auth_method, ip_address, last_session_refresh, login_username, realm_id, remember_me, started, user_id, user_session_state, broker_session_id, broker_user_id) FROM stdin;
    public          postgres    false    299   C�                0    172116    user_session_note 
   TABLE DATA           F   COPY public.user_session_note (user_session, name, value) FROM stdin;
    public          postgres    false    300   `�                0    172121    username_login_failure 
   TABLE DATA           �   COPY public.username_login_failure (realm_id, username, failed_login_not_before, last_failure, last_ip_failure, num_failures) FROM stdin;
    public          postgres    false    301   }�                0    172126    web_origins 
   TABLE DATA           7   COPY public.web_origins (client_id, value) FROM stdin;
    public          postgres    false    302   ��      C           0    0    commentaire_id_commentaire_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.commentaire_id_commentaire_seq', 3, true);
          public          postgres    false    303            D           0    0    etat_projet_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.etat_projet_id_seq', 1, false);
          public          postgres    false    305            E           0    0    etat_soustache_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.etat_soustache_id_seq', 1, false);
          public          postgres    false    307            F           0    0    etat_sprint_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.etat_sprint_id_seq', 1, false);
          public          postgres    false    309            G           0    0    etat_tache_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.etat_tache_id_seq', 1, false);
          public          postgres    false    311            H           0    0    fichier_id_fichier_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.fichier_id_fichier_seq', 2, true);
          public          postgres    false    331            I           0    0     notification_id_notification_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.notification_id_notification_seq', 3, true);
          public          postgres    false    313            J           0    0    projet_id_projet_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.projet_id_projet_seq', 19, true);
          public          postgres    false    315            K           0    0    projet_param_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.projet_param_id_seq', 8, true);
          public          postgres    false    323            L           0    0    soustache_id_soustache_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.soustache_id_soustache_seq', 2, true);
          public          postgres    false    317            M           0    0    soustache_param_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.soustache_param_id_seq', 8, true);
          public          postgres    false    325            N           0    0    sprint_id_sprint_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.sprint_id_sprint_seq', 4, true);
          public          postgres    false    319            O           0    0    sprint_param_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.sprint_param_id_seq', 8, true);
          public          postgres    false    327            P           0    0    tache_id_tache_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tache_id_tache_seq', 3, true);
          public          postgres    false    321            Q           0    0    tache_param_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tache_param_id_seq', 8, true);
          public          postgres    false    329            �           2606    172132 &   username_login_failure CONSTRAINT_17-2 
   CONSTRAINT     v   ALTER TABLE ONLY public.username_login_failure
    ADD CONSTRAINT "CONSTRAINT_17-2" PRIMARY KEY (realm_id, username);
 R   ALTER TABLE ONLY public.username_login_failure DROP CONSTRAINT "CONSTRAINT_17-2";
       public            postgres    false    301    301                       2606    172134 ,   keycloak_role UK_J3RWUVD56ONTGSUHOGM184WW2-2 
   CONSTRAINT     �   ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT "UK_J3RWUVD56ONTGSUHOGM184WW2-2" UNIQUE (name, client_realm_constraint);
 X   ALTER TABLE ONLY public.keycloak_role DROP CONSTRAINT "UK_J3RWUVD56ONTGSUHOGM184WW2-2";
       public            postgres    false    256    256            �           2606    172136 )   client_auth_flow_bindings c_cli_flow_bind 
   CONSTRAINT     |   ALTER TABLE ONLY public.client_auth_flow_bindings
    ADD CONSTRAINT c_cli_flow_bind PRIMARY KEY (client_id, binding_name);
 S   ALTER TABLE ONLY public.client_auth_flow_bindings DROP CONSTRAINT c_cli_flow_bind;
       public            postgres    false    218    218            �           2606    172138 $   client_scope_client c_cli_scope_bind 
   CONSTRAINT     s   ALTER TABLE ONLY public.client_scope_client
    ADD CONSTRAINT c_cli_scope_bind PRIMARY KEY (client_id, scope_id);
 N   ALTER TABLE ONLY public.client_scope_client DROP CONSTRAINT c_cli_scope_bind;
       public            postgres    false    224    224            �           2606    172140 .   client_initial_access cnstr_client_init_acc_pk 
   CONSTRAINT     l   ALTER TABLE ONLY public.client_initial_access
    ADD CONSTRAINT cnstr_client_init_acc_pk PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.client_initial_access DROP CONSTRAINT cnstr_client_init_acc_pk;
       public            postgres    false    220            �           2606    180131    commentaire commentaire_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT commentaire_pkey PRIMARY KEY (id_commentaire);
 F   ALTER TABLE ONLY public.commentaire DROP CONSTRAINT commentaire_pkey;
       public            postgres    false    304            #           2606    172142 ,   realm_default_groups con_group_id_def_groups 
   CONSTRAINT     k   ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT con_group_id_def_groups UNIQUE (group_id);
 V   ALTER TABLE ONLY public.realm_default_groups DROP CONSTRAINT con_group_id_def_groups;
       public            postgres    false    265            �           2606    172144 !   broker_link constr_broker_link_pk 
   CONSTRAINT     w   ALTER TABLE ONLY public.broker_link
    ADD CONSTRAINT constr_broker_link_pk PRIMARY KEY (identity_provider, user_id);
 K   ALTER TABLE ONLY public.broker_link DROP CONSTRAINT constr_broker_link_pk;
       public            postgres    false    215    215            �           2606    172146 /   client_user_session_note constr_cl_usr_ses_note 
   CONSTRAINT        ALTER TABLE ONLY public.client_user_session_note
    ADD CONSTRAINT constr_cl_usr_ses_note PRIMARY KEY (client_session, name);
 Y   ALTER TABLE ONLY public.client_user_session_note DROP CONSTRAINT constr_cl_usr_ses_note;
       public            postgres    false    231    231            �           2606    172148 0   client_default_roles constr_client_default_roles 
   CONSTRAINT     ~   ALTER TABLE ONLY public.client_default_roles
    ADD CONSTRAINT constr_client_default_roles PRIMARY KEY (client_id, role_id);
 Z   ALTER TABLE ONLY public.client_default_roles DROP CONSTRAINT constr_client_default_roles;
       public            postgres    false    219    219            �           2606    172150 +   component_config constr_component_config_pk 
   CONSTRAINT     i   ALTER TABLE ONLY public.component_config
    ADD CONSTRAINT constr_component_config_pk PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.component_config DROP CONSTRAINT constr_component_config_pk;
       public            postgres    false    233            �           2606    172152    component constr_component_pk 
   CONSTRAINT     [   ALTER TABLE ONLY public.component
    ADD CONSTRAINT constr_component_pk PRIMARY KEY (id);
 G   ALTER TABLE ONLY public.component DROP CONSTRAINT constr_component_pk;
       public            postgres    false    232            �           2606    172154 3   fed_user_required_action constr_fed_required_action 
   CONSTRAINT     �   ALTER TABLE ONLY public.fed_user_required_action
    ADD CONSTRAINT constr_fed_required_action PRIMARY KEY (required_action, user_id);
 ]   ALTER TABLE ONLY public.fed_user_required_action DROP CONSTRAINT constr_fed_required_action;
       public            postgres    false    245    245            �           2606    172156 *   fed_user_attribute constr_fed_user_attr_pk 
   CONSTRAINT     h   ALTER TABLE ONLY public.fed_user_attribute
    ADD CONSTRAINT constr_fed_user_attr_pk PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.fed_user_attribute DROP CONSTRAINT constr_fed_user_attr_pk;
       public            postgres    false    240            �           2606    172158 +   fed_user_consent constr_fed_user_consent_pk 
   CONSTRAINT     i   ALTER TABLE ONLY public.fed_user_consent
    ADD CONSTRAINT constr_fed_user_consent_pk PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.fed_user_consent DROP CONSTRAINT constr_fed_user_consent_pk;
       public            postgres    false    241            �           2606    172160 +   fed_user_credential constr_fed_user_cred_pk 
   CONSTRAINT     i   ALTER TABLE ONLY public.fed_user_credential
    ADD CONSTRAINT constr_fed_user_cred_pk PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.fed_user_credential DROP CONSTRAINT constr_fed_user_cred_pk;
       public            postgres    false    243            �           2606    172162 /   fed_user_group_membership constr_fed_user_group 
   CONSTRAINT     |   ALTER TABLE ONLY public.fed_user_group_membership
    ADD CONSTRAINT constr_fed_user_group PRIMARY KEY (group_id, user_id);
 Y   ALTER TABLE ONLY public.fed_user_group_membership DROP CONSTRAINT constr_fed_user_group;
       public            postgres    false    244    244            �           2606    172164 *   fed_user_role_mapping constr_fed_user_role 
   CONSTRAINT     v   ALTER TABLE ONLY public.fed_user_role_mapping
    ADD CONSTRAINT constr_fed_user_role PRIMARY KEY (role_id, user_id);
 T   ALTER TABLE ONLY public.fed_user_role_mapping DROP CONSTRAINT constr_fed_user_role;
       public            postgres    false    246    246            �           2606    172166 $   federated_user constr_federated_user 
   CONSTRAINT     b   ALTER TABLE ONLY public.federated_user
    ADD CONSTRAINT constr_federated_user PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.federated_user DROP CONSTRAINT constr_federated_user;
       public            postgres    false    248            %           2606    172168 0   realm_default_groups constr_realm_default_groups 
   CONSTRAINT     ~   ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT constr_realm_default_groups PRIMARY KEY (realm_id, group_id);
 Z   ALTER TABLE ONLY public.realm_default_groups DROP CONSTRAINT constr_realm_default_groups;
       public            postgres    false    265    265            -           2606    172170 8   realm_enabled_event_types constr_realm_enabl_event_types 
   CONSTRAINT     �   ALTER TABLE ONLY public.realm_enabled_event_types
    ADD CONSTRAINT constr_realm_enabl_event_types PRIMARY KEY (realm_id, value);
 b   ALTER TABLE ONLY public.realm_enabled_event_types DROP CONSTRAINT constr_realm_enabl_event_types;
       public            postgres    false    267    267            0           2606    172172 4   realm_events_listeners constr_realm_events_listeners 
   CONSTRAINT        ALTER TABLE ONLY public.realm_events_listeners
    ADD CONSTRAINT constr_realm_events_listeners PRIMARY KEY (realm_id, value);
 ^   ALTER TABLE ONLY public.realm_events_listeners DROP CONSTRAINT constr_realm_events_listeners;
       public            postgres    false    268    268            9           2606    172174 6   realm_supported_locales constr_realm_supported_locales 
   CONSTRAINT     �   ALTER TABLE ONLY public.realm_supported_locales
    ADD CONSTRAINT constr_realm_supported_locales PRIMARY KEY (realm_id, value);
 `   ALTER TABLE ONLY public.realm_supported_locales DROP CONSTRAINT constr_realm_supported_locales;
       public            postgres    false    272    272            �           2606    172176    identity_provider constraint_2b 
   CONSTRAINT     f   ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT constraint_2b PRIMARY KEY (internal_id);
 I   ALTER TABLE ONLY public.identity_provider DROP CONSTRAINT constraint_2b;
       public            postgres    false    251            �           2606    172178    client_attributes constraint_3c 
   CONSTRAINT     j   ALTER TABLE ONLY public.client_attributes
    ADD CONSTRAINT constraint_3c PRIMARY KEY (client_id, name);
 I   ALTER TABLE ONLY public.client_attributes DROP CONSTRAINT constraint_3c;
       public            postgres    false    217    217            �           2606    172180    event_entity constraint_4 
   CONSTRAINT     W   ALTER TABLE ONLY public.event_entity
    ADD CONSTRAINT constraint_4 PRIMARY KEY (id);
 C   ALTER TABLE ONLY public.event_entity DROP CONSTRAINT constraint_4;
       public            postgres    false    239            �           2606    172182     federated_identity constraint_40 
   CONSTRAINT     v   ALTER TABLE ONLY public.federated_identity
    ADD CONSTRAINT constraint_40 PRIMARY KEY (identity_provider, user_id);
 J   ALTER TABLE ONLY public.federated_identity DROP CONSTRAINT constraint_40;
       public            postgres    false    247    247                       2606    172184    realm constraint_4a 
   CONSTRAINT     Q   ALTER TABLE ONLY public.realm
    ADD CONSTRAINT constraint_4a PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.realm DROP CONSTRAINT constraint_4a;
       public            postgres    false    263            �           2606    172186     client_session_role constraint_5 
   CONSTRAINT     s   ALTER TABLE ONLY public.client_session_role
    ADD CONSTRAINT constraint_5 PRIMARY KEY (client_session, role_id);
 J   ALTER TABLE ONLY public.client_session_role DROP CONSTRAINT constraint_5;
       public            postgres    false    230    230            �           2606    172188    user_session constraint_57 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_session
    ADD CONSTRAINT constraint_57 PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_session DROP CONSTRAINT constraint_57;
       public            postgres    false    299            �           2606    172190 &   user_federation_provider constraint_5c 
   CONSTRAINT     d   ALTER TABLE ONLY public.user_federation_provider
    ADD CONSTRAINT constraint_5c PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.user_federation_provider DROP CONSTRAINT constraint_5c;
       public            postgres    false    295            �           2606    172192 !   client_session_note constraint_5e 
   CONSTRAINT     q   ALTER TABLE ONLY public.client_session_note
    ADD CONSTRAINT constraint_5e PRIMARY KEY (client_session, name);
 K   ALTER TABLE ONLY public.client_session_note DROP CONSTRAINT constraint_5e;
       public            postgres    false    228    228            �           2606    172194    client constraint_7 
   CONSTRAINT     Q   ALTER TABLE ONLY public.client
    ADD CONSTRAINT constraint_7 PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.client DROP CONSTRAINT constraint_7;
       public            postgres    false    216            �           2606    172196    client_session constraint_8 
   CONSTRAINT     Y   ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT constraint_8 PRIMARY KEY (id);
 E   ALTER TABLE ONLY public.client_session DROP CONSTRAINT constraint_8;
       public            postgres    false    226            f           2606    172198    scope_mapping constraint_81 
   CONSTRAINT     i   ALTER TABLE ONLY public.scope_mapping
    ADD CONSTRAINT constraint_81 PRIMARY KEY (client_id, role_id);
 E   ALTER TABLE ONLY public.scope_mapping DROP CONSTRAINT constraint_81;
       public            postgres    false    286    286            �           2606    172200 '   client_node_registrations constraint_84 
   CONSTRAINT     r   ALTER TABLE ONLY public.client_node_registrations
    ADD CONSTRAINT constraint_84 PRIMARY KEY (client_id, name);
 Q   ALTER TABLE ONLY public.client_node_registrations DROP CONSTRAINT constraint_84;
       public            postgres    false    221    221                        2606    172202    realm_attribute constraint_9 
   CONSTRAINT     f   ALTER TABLE ONLY public.realm_attribute
    ADD CONSTRAINT constraint_9 PRIMARY KEY (name, realm_id);
 F   ALTER TABLE ONLY public.realm_attribute DROP CONSTRAINT constraint_9;
       public            postgres    false    264    264            5           2606    172204 '   realm_required_credential constraint_92 
   CONSTRAINT     q   ALTER TABLE ONLY public.realm_required_credential
    ADD CONSTRAINT constraint_92 PRIMARY KEY (realm_id, type);
 Q   ALTER TABLE ONLY public.realm_required_credential DROP CONSTRAINT constraint_92;
       public            postgres    false    270    270                       2606    172206    keycloak_role constraint_a 
   CONSTRAINT     X   ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT constraint_a PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.keycloak_role DROP CONSTRAINT constraint_a;
       public            postgres    false    256            t           2606    172208 0   admin_event_entity constraint_admin_event_entity 
   CONSTRAINT     n   ALTER TABLE ONLY public.admin_event_entity
    ADD CONSTRAINT constraint_admin_event_entity PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.admin_event_entity DROP CONSTRAINT constraint_admin_event_entity;
       public            postgres    false    209            �           2606    172210 1   authenticator_config_entry constraint_auth_cfg_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.authenticator_config_entry
    ADD CONSTRAINT constraint_auth_cfg_pk PRIMARY KEY (authenticator_id, name);
 [   ALTER TABLE ONLY public.authenticator_config_entry DROP CONSTRAINT constraint_auth_cfg_pk;
       public            postgres    false    214    214            y           2606    172212 0   authentication_execution constraint_auth_exec_pk 
   CONSTRAINT     n   ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT constraint_auth_exec_pk PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.authentication_execution DROP CONSTRAINT constraint_auth_exec_pk;
       public            postgres    false    211            }           2606    172214 +   authentication_flow constraint_auth_flow_pk 
   CONSTRAINT     i   ALTER TABLE ONLY public.authentication_flow
    ADD CONSTRAINT constraint_auth_flow_pk PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.authentication_flow DROP CONSTRAINT constraint_auth_flow_pk;
       public            postgres    false    212            �           2606    172216 '   authenticator_config constraint_auth_pk 
   CONSTRAINT     e   ALTER TABLE ONLY public.authenticator_config
    ADD CONSTRAINT constraint_auth_pk PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.authenticator_config DROP CONSTRAINT constraint_auth_pk;
       public            postgres    false    213            �           2606    172218 4   client_session_auth_status constraint_auth_status_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.client_session_auth_status
    ADD CONSTRAINT constraint_auth_status_pk PRIMARY KEY (client_session, authenticator);
 ^   ALTER TABLE ONLY public.client_session_auth_status DROP CONSTRAINT constraint_auth_status_pk;
       public            postgres    false    227    227            �           2606    172220    user_role_mapping constraint_c 
   CONSTRAINT     j   ALTER TABLE ONLY public.user_role_mapping
    ADD CONSTRAINT constraint_c PRIMARY KEY (role_id, user_id);
 H   ALTER TABLE ONLY public.user_role_mapping DROP CONSTRAINT constraint_c;
       public            postgres    false    298    298            �           2606    172222 (   composite_role constraint_composite_role 
   CONSTRAINT     y   ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT constraint_composite_role PRIMARY KEY (composite, child_role);
 R   ALTER TABLE ONLY public.composite_role DROP CONSTRAINT constraint_composite_role;
       public            postgres    false    234    234            �           2606    172224 /   client_session_prot_mapper constraint_cs_pmp_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.client_session_prot_mapper
    ADD CONSTRAINT constraint_cs_pmp_pk PRIMARY KEY (client_session, protocol_mapper_id);
 Y   ALTER TABLE ONLY public.client_session_prot_mapper DROP CONSTRAINT constraint_cs_pmp_pk;
       public            postgres    false    229    229            �           2606    172226 %   identity_provider_config constraint_d 
   CONSTRAINT     {   ALTER TABLE ONLY public.identity_provider_config
    ADD CONSTRAINT constraint_d PRIMARY KEY (identity_provider_id, name);
 O   ALTER TABLE ONLY public.identity_provider_config DROP CONSTRAINT constraint_d;
       public            postgres    false    252    252                       2606    172228    policy_config constraint_dpc 
   CONSTRAINT     g   ALTER TABLE ONLY public.policy_config
    ADD CONSTRAINT constraint_dpc PRIMARY KEY (policy_id, name);
 F   ALTER TABLE ONLY public.policy_config DROP CONSTRAINT constraint_dpc;
       public            postgres    false    260    260            7           2606    172230    realm_smtp_config constraint_e 
   CONSTRAINT     h   ALTER TABLE ONLY public.realm_smtp_config
    ADD CONSTRAINT constraint_e PRIMARY KEY (realm_id, name);
 H   ALTER TABLE ONLY public.realm_smtp_config DROP CONSTRAINT constraint_e;
       public            postgres    false    271    271            �           2606    172232    credential constraint_f 
   CONSTRAINT     U   ALTER TABLE ONLY public.credential
    ADD CONSTRAINT constraint_f PRIMARY KEY (id);
 A   ALTER TABLE ONLY public.credential DROP CONSTRAINT constraint_f;
       public            postgres    false    235            ~           2606    172234 $   user_federation_config constraint_f9 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_federation_config
    ADD CONSTRAINT constraint_f9 PRIMARY KEY (user_federation_provider_id, name);
 N   ALTER TABLE ONLY public.user_federation_config DROP CONSTRAINT constraint_f9;
       public            postgres    false    292    292            N           2606    172236 ,   resource_server_perm_ticket constraint_fapmt 
   CONSTRAINT     j   ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT constraint_fapmt PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.resource_server_perm_ticket DROP CONSTRAINT constraint_fapmt;
       public            postgres    false    280            W           2606    172238 )   resource_server_resource constraint_farsr 
   CONSTRAINT     g   ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT constraint_farsr PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.resource_server_resource DROP CONSTRAINT constraint_farsr;
       public            postgres    false    282            R           2606    172240 (   resource_server_policy constraint_farsrp 
   CONSTRAINT     f   ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT constraint_farsrp PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.resource_server_policy DROP CONSTRAINT constraint_farsrp;
       public            postgres    false    281            v           2606    172242 %   associated_policy constraint_farsrpap 
   CONSTRAINT     �   ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT constraint_farsrpap PRIMARY KEY (policy_id, associated_policy_id);
 O   ALTER TABLE ONLY public.associated_policy DROP CONSTRAINT constraint_farsrpap;
       public            postgres    false    210    210            F           2606    172244 "   resource_policy constraint_farsrpp 
   CONSTRAINT     t   ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT constraint_farsrpp PRIMARY KEY (resource_id, policy_id);
 L   ALTER TABLE ONLY public.resource_policy DROP CONSTRAINT constraint_farsrpp;
       public            postgres    false    277    277            \           2606    172246 '   resource_server_scope constraint_farsrs 
   CONSTRAINT     e   ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT constraint_farsrs PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.resource_server_scope DROP CONSTRAINT constraint_farsrs;
       public            postgres    false    283            I           2606    172248 !   resource_scope constraint_farsrsp 
   CONSTRAINT     r   ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT constraint_farsrsp PRIMARY KEY (resource_id, scope_id);
 K   ALTER TABLE ONLY public.resource_scope DROP CONSTRAINT constraint_farsrsp;
       public            postgres    false    278    278            i           2606    172250     scope_policy constraint_farsrsps 
   CONSTRAINT     o   ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT constraint_farsrsps PRIMARY KEY (scope_id, policy_id);
 J   ALTER TABLE ONLY public.scope_policy DROP CONSTRAINT constraint_farsrsps;
       public            postgres    false    287    287            w           2606    172252    user_entity constraint_fb 
   CONSTRAINT     W   ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT constraint_fb PRIMARY KEY (id);
 C   ALTER TABLE ONLY public.user_entity DROP CONSTRAINT constraint_fb;
       public            postgres    false    291            �           2606    172254 9   user_federation_mapper_config constraint_fedmapper_cfg_pm 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_federation_mapper_config
    ADD CONSTRAINT constraint_fedmapper_cfg_pm PRIMARY KEY (user_federation_mapper_id, name);
 c   ALTER TABLE ONLY public.user_federation_mapper_config DROP CONSTRAINT constraint_fedmapper_cfg_pm;
       public            postgres    false    294    294            �           2606    172256 -   user_federation_mapper constraint_fedmapperpm 
   CONSTRAINT     k   ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT constraint_fedmapperpm PRIMARY KEY (id);
 W   ALTER TABLE ONLY public.user_federation_mapper DROP CONSTRAINT constraint_fedmapperpm;
       public            postgres    false    293            �           2606    172258 6   fed_user_consent_cl_scope constraint_fgrntcsnt_clsc_pm 
   CONSTRAINT     �   ALTER TABLE ONLY public.fed_user_consent_cl_scope
    ADD CONSTRAINT constraint_fgrntcsnt_clsc_pm PRIMARY KEY (user_consent_id, scope_id);
 `   ALTER TABLE ONLY public.fed_user_consent_cl_scope DROP CONSTRAINT constraint_fgrntcsnt_clsc_pm;
       public            postgres    false    242    242            t           2606    172260 5   user_consent_client_scope constraint_grntcsnt_clsc_pm 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_consent_client_scope
    ADD CONSTRAINT constraint_grntcsnt_clsc_pm PRIMARY KEY (user_consent_id, scope_id);
 _   ALTER TABLE ONLY public.user_consent_client_scope DROP CONSTRAINT constraint_grntcsnt_clsc_pm;
       public            postgres    false    290    290            o           2606    172262 #   user_consent constraint_grntcsnt_pm 
   CONSTRAINT     a   ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT constraint_grntcsnt_pm PRIMARY KEY (id);
 M   ALTER TABLE ONLY public.user_consent DROP CONSTRAINT constraint_grntcsnt_pm;
       public            postgres    false    289                        2606    172264    keycloak_group constraint_group 
   CONSTRAINT     ]   ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT constraint_group PRIMARY KEY (id);
 I   ALTER TABLE ONLY public.keycloak_group DROP CONSTRAINT constraint_group;
       public            postgres    false    255            �           2606    172266 -   group_attribute constraint_group_attribute_pk 
   CONSTRAINT     k   ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT constraint_group_attribute_pk PRIMARY KEY (id);
 W   ALTER TABLE ONLY public.group_attribute DROP CONSTRAINT constraint_group_attribute_pk;
       public            postgres    false    249            �           2606    172268 (   group_role_mapping constraint_group_role 
   CONSTRAINT     u   ALTER TABLE ONLY public.group_role_mapping
    ADD CONSTRAINT constraint_group_role PRIMARY KEY (role_id, group_id);
 R   ALTER TABLE ONLY public.group_role_mapping DROP CONSTRAINT constraint_group_role;
       public            postgres    false    250    250            �           2606    172270 (   identity_provider_mapper constraint_idpm 
   CONSTRAINT     f   ALTER TABLE ONLY public.identity_provider_mapper
    ADD CONSTRAINT constraint_idpm PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.identity_provider_mapper DROP CONSTRAINT constraint_idpm;
       public            postgres    false    253            �           2606    172272 '   idp_mapper_config constraint_idpmconfig 
   CONSTRAINT     v   ALTER TABLE ONLY public.idp_mapper_config
    ADD CONSTRAINT constraint_idpmconfig PRIMARY KEY (idp_mapper_id, name);
 Q   ALTER TABLE ONLY public.idp_mapper_config DROP CONSTRAINT constraint_idpmconfig;
       public            postgres    false    254    254            
           2606    172274 !   migration_model constraint_migmod 
   CONSTRAINT     _   ALTER TABLE ONLY public.migration_model
    ADD CONSTRAINT constraint_migmod PRIMARY KEY (id);
 K   ALTER TABLE ONLY public.migration_model DROP CONSTRAINT constraint_migmod;
       public            postgres    false    257                       2606    172276 1   offline_client_session constraint_offl_cl_ses_pk3 
   CONSTRAINT     �   ALTER TABLE ONLY public.offline_client_session
    ADD CONSTRAINT constraint_offl_cl_ses_pk3 PRIMARY KEY (user_session_id, client_id, client_storage_provider, external_client_id, offline_flag);
 [   ALTER TABLE ONLY public.offline_client_session DROP CONSTRAINT constraint_offl_cl_ses_pk3;
       public            postgres    false    258    258    258    258    258                       2606    172278 /   offline_user_session constraint_offl_us_ses_pk2 
   CONSTRAINT     �   ALTER TABLE ONLY public.offline_user_session
    ADD CONSTRAINT constraint_offl_us_ses_pk2 PRIMARY KEY (user_session_id, offline_flag);
 Y   ALTER TABLE ONLY public.offline_user_session DROP CONSTRAINT constraint_offl_us_ses_pk2;
       public            postgres    false    259    259                       2606    172280    protocol_mapper constraint_pcm 
   CONSTRAINT     \   ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT constraint_pcm PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.protocol_mapper DROP CONSTRAINT constraint_pcm;
       public            postgres    false    261                       2606    172282 *   protocol_mapper_config constraint_pmconfig 
   CONSTRAINT     ~   ALTER TABLE ONLY public.protocol_mapper_config
    ADD CONSTRAINT constraint_pmconfig PRIMARY KEY (protocol_mapper_id, name);
 T   ALTER TABLE ONLY public.protocol_mapper_config DROP CONSTRAINT constraint_pmconfig;
       public            postgres    false    262    262            (           2606    172284 2   realm_default_roles constraint_realm_default_roles 
   CONSTRAINT        ALTER TABLE ONLY public.realm_default_roles
    ADD CONSTRAINT constraint_realm_default_roles PRIMARY KEY (realm_id, role_id);
 \   ALTER TABLE ONLY public.realm_default_roles DROP CONSTRAINT constraint_realm_default_roles;
       public            postgres    false    266    266            <           2606    172286 &   redirect_uris constraint_redirect_uris 
   CONSTRAINT     r   ALTER TABLE ONLY public.redirect_uris
    ADD CONSTRAINT constraint_redirect_uris PRIMARY KEY (client_id, value);
 P   ALTER TABLE ONLY public.redirect_uris DROP CONSTRAINT constraint_redirect_uris;
       public            postgres    false    273    273            ?           2606    172288 0   required_action_config constraint_req_act_cfg_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.required_action_config
    ADD CONSTRAINT constraint_req_act_cfg_pk PRIMARY KEY (required_action_id, name);
 Z   ALTER TABLE ONLY public.required_action_config DROP CONSTRAINT constraint_req_act_cfg_pk;
       public            postgres    false    274    274            A           2606    172290 2   required_action_provider constraint_req_act_prv_pk 
   CONSTRAINT     p   ALTER TABLE ONLY public.required_action_provider
    ADD CONSTRAINT constraint_req_act_prv_pk PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.required_action_provider DROP CONSTRAINT constraint_req_act_prv_pk;
       public            postgres    false    275            �           2606    172292 /   user_required_action constraint_required_action 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_required_action
    ADD CONSTRAINT constraint_required_action PRIMARY KEY (required_action, user_id);
 Y   ALTER TABLE ONLY public.user_required_action DROP CONSTRAINT constraint_required_action;
       public            postgres    false    297    297            a           2606    172294 '   resource_uris constraint_resour_uris_pk 
   CONSTRAINT     u   ALTER TABLE ONLY public.resource_uris
    ADD CONSTRAINT constraint_resour_uris_pk PRIMARY KEY (resource_id, value);
 Q   ALTER TABLE ONLY public.resource_uris DROP CONSTRAINT constraint_resour_uris_pk;
       public            postgres    false    284    284            c           2606    172296 +   role_attribute constraint_role_attribute_pk 
   CONSTRAINT     i   ALTER TABLE ONLY public.role_attribute
    ADD CONSTRAINT constraint_role_attribute_pk PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.role_attribute DROP CONSTRAINT constraint_role_attribute_pk;
       public            postgres    false    285            l           2606    172298 +   user_attribute constraint_user_attribute_pk 
   CONSTRAINT     i   ALTER TABLE ONLY public.user_attribute
    ADD CONSTRAINT constraint_user_attribute_pk PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.user_attribute DROP CONSTRAINT constraint_user_attribute_pk;
       public            postgres    false    288            �           2606    172300 +   user_group_membership constraint_user_group 
   CONSTRAINT     x   ALTER TABLE ONLY public.user_group_membership
    ADD CONSTRAINT constraint_user_group PRIMARY KEY (group_id, user_id);
 U   ALTER TABLE ONLY public.user_group_membership DROP CONSTRAINT constraint_user_group;
       public            postgres    false    296    296            �           2606    172302 #   user_session_note constraint_usn_pk 
   CONSTRAINT     q   ALTER TABLE ONLY public.user_session_note
    ADD CONSTRAINT constraint_usn_pk PRIMARY KEY (user_session, name);
 M   ALTER TABLE ONLY public.user_session_note DROP CONSTRAINT constraint_usn_pk;
       public            postgres    false    300    300            �           2606    172304 "   web_origins constraint_web_origins 
   CONSTRAINT     n   ALTER TABLE ONLY public.web_origins
    ADD CONSTRAINT constraint_web_origins PRIMARY KEY (client_id, value);
 L   ALTER TABLE ONLY public.web_origins DROP CONSTRAINT constraint_web_origins;
       public            postgres    false    302    302            �           2606    180138    etat_projet etat_projet_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.etat_projet
    ADD CONSTRAINT etat_projet_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.etat_projet DROP CONSTRAINT etat_projet_pkey;
       public            postgres    false    306            �           2606    180145 "   etat_soustache etat_soustache_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.etat_soustache
    ADD CONSTRAINT etat_soustache_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.etat_soustache DROP CONSTRAINT etat_soustache_pkey;
       public            postgres    false    308            �           2606    180152    etat_sprint etat_sprint_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.etat_sprint
    ADD CONSTRAINT etat_sprint_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.etat_sprint DROP CONSTRAINT etat_sprint_pkey;
       public            postgres    false    310            �           2606    180159    etat_tache etat_tache_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.etat_tache
    ADD CONSTRAINT etat_tache_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.etat_tache DROP CONSTRAINT etat_tache_pkey;
       public            postgres    false    312            �           2606    188621    fichier fichier_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.fichier
    ADD CONSTRAINT fichier_pkey PRIMARY KEY (id_fichier);
 >   ALTER TABLE ONLY public.fichier DROP CONSTRAINT fichier_pkey;
       public            postgres    false    332            �           2606    180177    notification notification_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id_notification);
 H   ALTER TABLE ONLY public.notification DROP CONSTRAINT notification_pkey;
       public            postgres    false    314            �           2606    172306 '   client_scope_attributes pk_cl_tmpl_attr 
   CONSTRAINT     q   ALTER TABLE ONLY public.client_scope_attributes
    ADD CONSTRAINT pk_cl_tmpl_attr PRIMARY KEY (scope_id, name);
 Q   ALTER TABLE ONLY public.client_scope_attributes DROP CONSTRAINT pk_cl_tmpl_attr;
       public            postgres    false    223    223            �           2606    172308    client_scope pk_cli_template 
   CONSTRAINT     Z   ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT pk_cli_template PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.client_scope DROP CONSTRAINT pk_cli_template;
       public            postgres    false    222            �           2606    172310 .   databasechangeloglock pk_databasechangeloglock 
   CONSTRAINT     l   ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT pk_databasechangeloglock PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.databasechangeloglock DROP CONSTRAINT pk_databasechangeloglock;
       public            postgres    false    237            L           2606    172312 "   resource_server pk_resource_server 
   CONSTRAINT     `   ALTER TABLE ONLY public.resource_server
    ADD CONSTRAINT pk_resource_server PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.resource_server DROP CONSTRAINT pk_resource_server;
       public            postgres    false    279            �           2606    172314 +   client_scope_role_mapping pk_template_scope 
   CONSTRAINT     x   ALTER TABLE ONLY public.client_scope_role_mapping
    ADD CONSTRAINT pk_template_scope PRIMARY KEY (scope_id, role_id);
 U   ALTER TABLE ONLY public.client_scope_role_mapping DROP CONSTRAINT pk_template_scope;
       public            postgres    false    225    225            �           2606    180338    projet_param projet_param_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.projet_param
    ADD CONSTRAINT projet_param_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.projet_param DROP CONSTRAINT projet_param_pkey;
       public            postgres    false    324            �           2606    180186    projet projet_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.projet
    ADD CONSTRAINT projet_pkey PRIMARY KEY (id_projet);
 <   ALTER TABLE ONLY public.projet DROP CONSTRAINT projet_pkey;
       public            postgres    false    316            �           2606    172318 )   default_client_scope r_def_cli_scope_bind 
   CONSTRAINT     w   ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT r_def_cli_scope_bind PRIMARY KEY (realm_id, scope_id);
 S   ALTER TABLE ONLY public.default_client_scope DROP CONSTRAINT r_def_cli_scope_bind;
       public            postgres    false    238    238            3           2606    172320 ,   realm_localizations realm_localizations_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.realm_localizations
    ADD CONSTRAINT realm_localizations_pkey PRIMARY KEY (realm_id, locale);
 V   ALTER TABLE ONLY public.realm_localizations DROP CONSTRAINT realm_localizations_pkey;
       public            postgres    false    269    269            D           2606    172322    resource_attribute res_attr_pk 
   CONSTRAINT     \   ALTER TABLE ONLY public.resource_attribute
    ADD CONSTRAINT res_attr_pk PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.resource_attribute DROP CONSTRAINT res_attr_pk;
       public            postgres    false    276                       2606    172324    keycloak_group sibling_names 
   CONSTRAINT     o   ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT sibling_names UNIQUE (realm_id, parent_group, name);
 F   ALTER TABLE ONLY public.keycloak_group DROP CONSTRAINT sibling_names;
       public            postgres    false    255    255    255            �           2606    180345 $   soustache_param soustache_param_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.soustache_param
    ADD CONSTRAINT soustache_param_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.soustache_param DROP CONSTRAINT soustache_param_pkey;
       public            postgres    false    326            �           2606    180195    soustache soustache_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.soustache
    ADD CONSTRAINT soustache_pkey PRIMARY KEY (id_soustache);
 B   ALTER TABLE ONLY public.soustache DROP CONSTRAINT soustache_pkey;
       public            postgres    false    318            �           2606    180352    sprint_param sprint_param_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.sprint_param
    ADD CONSTRAINT sprint_param_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.sprint_param DROP CONSTRAINT sprint_param_pkey;
       public            postgres    false    328            �           2606    180204    sprint sprint_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.sprint
    ADD CONSTRAINT sprint_pkey PRIMARY KEY (id_sprint);
 <   ALTER TABLE ONLY public.sprint DROP CONSTRAINT sprint_pkey;
       public            postgres    false    320            �           2606    180359    tache_param tache_param_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tache_param
    ADD CONSTRAINT tache_param_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tache_param DROP CONSTRAINT tache_param_pkey;
       public            postgres    false    330            �           2606    180213    tache tache_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.tache
    ADD CONSTRAINT tache_pkey PRIMARY KEY (id_tache);
 :   ALTER TABLE ONLY public.tache DROP CONSTRAINT tache_pkey;
       public            postgres    false    322            �           2606    172328 /   identity_provider uk_2daelwnibji49avxsrtuf6xj33 
   CONSTRAINT     ~   ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT uk_2daelwnibji49avxsrtuf6xj33 UNIQUE (provider_alias, realm_id);
 Y   ALTER TABLE ONLY public.identity_provider DROP CONSTRAINT uk_2daelwnibji49avxsrtuf6xj33;
       public            postgres    false    251    251            �           2606    172330 1   client_default_roles uk_8aelwnibji49avxsrtuf6xjow 
   CONSTRAINT     o   ALTER TABLE ONLY public.client_default_roles
    ADD CONSTRAINT uk_8aelwnibji49avxsrtuf6xjow UNIQUE (role_id);
 [   ALTER TABLE ONLY public.client_default_roles DROP CONSTRAINT uk_8aelwnibji49avxsrtuf6xjow;
       public            postgres    false    219            �           2606    180217 +   etat_soustache uk_9naqii3xlhn618qjvg960f0we 
   CONSTRAINT     e   ALTER TABLE ONLY public.etat_soustache
    ADD CONSTRAINT uk_9naqii3xlhn618qjvg960f0we UNIQUE (nom);
 U   ALTER TABLE ONLY public.etat_soustache DROP CONSTRAINT uk_9naqii3xlhn618qjvg960f0we;
       public            postgres    false    308            �           2606    172332 #   client uk_b71cjlbenv945rb6gcon438at 
   CONSTRAINT     m   ALTER TABLE ONLY public.client
    ADD CONSTRAINT uk_b71cjlbenv945rb6gcon438at UNIQUE (realm_id, client_id);
 M   ALTER TABLE ONLY public.client DROP CONSTRAINT uk_b71cjlbenv945rb6gcon438at;
       public            postgres    false    216    216            �           2606    172334    client_scope uk_cli_scope 
   CONSTRAINT     ^   ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT uk_cli_scope UNIQUE (realm_id, name);
 C   ALTER TABLE ONLY public.client_scope DROP CONSTRAINT uk_cli_scope;
       public            postgres    false    222    222            �           2606    180221 '   etat_tache uk_crympf4pt30hf3vkheekvvxnf 
   CONSTRAINT     a   ALTER TABLE ONLY public.etat_tache
    ADD CONSTRAINT uk_crympf4pt30hf3vkheekvvxnf UNIQUE (nom);
 Q   ALTER TABLE ONLY public.etat_tache DROP CONSTRAINT uk_crympf4pt30hf3vkheekvvxnf;
       public            postgres    false    312            �           2606    180219 (   etat_sprint uk_dewnmt9jhbkp7ix7k7gpnka5b 
   CONSTRAINT     b   ALTER TABLE ONLY public.etat_sprint
    ADD CONSTRAINT uk_dewnmt9jhbkp7ix7k7gpnka5b UNIQUE (nom);
 R   ALTER TABLE ONLY public.etat_sprint DROP CONSTRAINT uk_dewnmt9jhbkp7ix7k7gpnka5b;
       public            postgres    false    310            z           2606    172336 (   user_entity uk_dykn684sl8up1crfei6eckhd7 
   CONSTRAINT     y   ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT uk_dykn684sl8up1crfei6eckhd7 UNIQUE (realm_id, email_constraint);
 R   ALTER TABLE ONLY public.user_entity DROP CONSTRAINT uk_dykn684sl8up1crfei6eckhd7;
       public            postgres    false    291    291            Z           2606    172338 4   resource_server_resource uk_frsr6t700s9v50bu18ws5ha6 
   CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT uk_frsr6t700s9v50bu18ws5ha6 UNIQUE (name, owner, resource_server_id);
 ^   ALTER TABLE ONLY public.resource_server_resource DROP CONSTRAINT uk_frsr6t700s9v50bu18ws5ha6;
       public            postgres    false    282    282    282            P           2606    172340 7   resource_server_perm_ticket uk_frsr6t700s9v50bu18ws5pmt 
   CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT uk_frsr6t700s9v50bu18ws5pmt UNIQUE (owner, requester, resource_server_id, resource_id, scope_id);
 a   ALTER TABLE ONLY public.resource_server_perm_ticket DROP CONSTRAINT uk_frsr6t700s9v50bu18ws5pmt;
       public            postgres    false    280    280    280    280    280            U           2606    172342 2   resource_server_policy uk_frsrpt700s9v50bu18ws5ha6 
   CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT uk_frsrpt700s9v50bu18ws5ha6 UNIQUE (name, resource_server_id);
 \   ALTER TABLE ONLY public.resource_server_policy DROP CONSTRAINT uk_frsrpt700s9v50bu18ws5ha6;
       public            postgres    false    281    281            _           2606    172344 1   resource_server_scope uk_frsrst700s9v50bu18ws5ha6 
   CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT uk_frsrst700s9v50bu18ws5ha6 UNIQUE (name, resource_server_id);
 [   ALTER TABLE ONLY public.resource_server_scope DROP CONSTRAINT uk_frsrst700s9v50bu18ws5ha6;
       public            postgres    false    283    283            +           2606    172346 0   realm_default_roles uk_h4wpd7w4hsoolni3h0sw7btje 
   CONSTRAINT     n   ALTER TABLE ONLY public.realm_default_roles
    ADD CONSTRAINT uk_h4wpd7w4hsoolni3h0sw7btje UNIQUE (role_id);
 Z   ALTER TABLE ONLY public.realm_default_roles DROP CONSTRAINT uk_h4wpd7w4hsoolni3h0sw7btje;
       public            postgres    false    266            �           2606    180225 #   projet uk_hc62ibguw2x2cf7f1b2sr2j23 
   CONSTRAINT     ]   ALTER TABLE ONLY public.projet
    ADD CONSTRAINT uk_hc62ibguw2x2cf7f1b2sr2j23 UNIQUE (nom);
 M   ALTER TABLE ONLY public.projet DROP CONSTRAINT uk_hc62ibguw2x2cf7f1b2sr2j23;
       public            postgres    false    316            r           2606    172350 )   user_consent uk_jkuwuvd56ontgsuhogm8uewrt 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT uk_jkuwuvd56ontgsuhogm8uewrt UNIQUE (client_id, client_storage_provider, external_client_id, user_id);
 S   ALTER TABLE ONLY public.user_consent DROP CONSTRAINT uk_jkuwuvd56ontgsuhogm8uewrt;
       public            postgres    false    289    289    289    289            �           2606    180215 '   etat_projet uk_ndiis87pwhg9cucst0pdsas7 
   CONSTRAINT     a   ALTER TABLE ONLY public.etat_projet
    ADD CONSTRAINT uk_ndiis87pwhg9cucst0pdsas7 UNIQUE (nom);
 Q   ALTER TABLE ONLY public.etat_projet DROP CONSTRAINT uk_ndiis87pwhg9cucst0pdsas7;
       public            postgres    false    306                       2606    172352 "   realm uk_orvsdmla56612eaefiq6wl5oi 
   CONSTRAINT     ]   ALTER TABLE ONLY public.realm
    ADD CONSTRAINT uk_orvsdmla56612eaefiq6wl5oi UNIQUE (name);
 L   ALTER TABLE ONLY public.realm DROP CONSTRAINT uk_orvsdmla56612eaefiq6wl5oi;
       public            postgres    false    263            |           2606    172354 (   user_entity uk_ru8tt6t700s9v50bu18ws5ha6 
   CONSTRAINT     q   ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT uk_ru8tt6t700s9v50bu18ws5ha6 UNIQUE (realm_id, username);
 R   ALTER TABLE ONLY public.user_entity DROP CONSTRAINT uk_ru8tt6t700s9v50bu18ws5ha6;
       public            postgres    false    291    291            w           1259    172355    idx_assoc_pol_assoc_pol_id    INDEX     h   CREATE INDEX idx_assoc_pol_assoc_pol_id ON public.associated_policy USING btree (associated_policy_id);
 .   DROP INDEX public.idx_assoc_pol_assoc_pol_id;
       public            postgres    false    210            �           1259    172356    idx_auth_config_realm    INDEX     Z   CREATE INDEX idx_auth_config_realm ON public.authenticator_config USING btree (realm_id);
 )   DROP INDEX public.idx_auth_config_realm;
       public            postgres    false    213            z           1259    172357    idx_auth_exec_flow    INDEX     Z   CREATE INDEX idx_auth_exec_flow ON public.authentication_execution USING btree (flow_id);
 &   DROP INDEX public.idx_auth_exec_flow;
       public            postgres    false    211            {           1259    172358    idx_auth_exec_realm_flow    INDEX     j   CREATE INDEX idx_auth_exec_realm_flow ON public.authentication_execution USING btree (realm_id, flow_id);
 ,   DROP INDEX public.idx_auth_exec_realm_flow;
       public            postgres    false    211    211            ~           1259    172359    idx_auth_flow_realm    INDEX     W   CREATE INDEX idx_auth_flow_realm ON public.authentication_flow USING btree (realm_id);
 '   DROP INDEX public.idx_auth_flow_realm;
       public            postgres    false    212            �           1259    172360    idx_cl_clscope    INDEX     R   CREATE INDEX idx_cl_clscope ON public.client_scope_client USING btree (scope_id);
 "   DROP INDEX public.idx_cl_clscope;
       public            postgres    false    224            �           1259    172361    idx_client_def_roles_client    INDEX     a   CREATE INDEX idx_client_def_roles_client ON public.client_default_roles USING btree (client_id);
 /   DROP INDEX public.idx_client_def_roles_client;
       public            postgres    false    219            �           1259    172362    idx_client_id    INDEX     E   CREATE INDEX idx_client_id ON public.client USING btree (client_id);
 !   DROP INDEX public.idx_client_id;
       public            postgres    false    216            �           1259    172363    idx_client_init_acc_realm    INDEX     _   CREATE INDEX idx_client_init_acc_realm ON public.client_initial_access USING btree (realm_id);
 -   DROP INDEX public.idx_client_init_acc_realm;
       public            postgres    false    220            �           1259    172364    idx_client_session_session    INDEX     [   CREATE INDEX idx_client_session_session ON public.client_session USING btree (session_id);
 .   DROP INDEX public.idx_client_session_session;
       public            postgres    false    226            �           1259    172365    idx_clscope_attrs    INDEX     Y   CREATE INDEX idx_clscope_attrs ON public.client_scope_attributes USING btree (scope_id);
 %   DROP INDEX public.idx_clscope_attrs;
       public            postgres    false    223            �           1259    172366    idx_clscope_cl    INDEX     S   CREATE INDEX idx_clscope_cl ON public.client_scope_client USING btree (client_id);
 "   DROP INDEX public.idx_clscope_cl;
       public            postgres    false    224                       1259    172367    idx_clscope_protmap    INDEX     Z   CREATE INDEX idx_clscope_protmap ON public.protocol_mapper USING btree (client_scope_id);
 '   DROP INDEX public.idx_clscope_protmap;
       public            postgres    false    261            �           1259    172368    idx_clscope_role    INDEX     Z   CREATE INDEX idx_clscope_role ON public.client_scope_role_mapping USING btree (scope_id);
 $   DROP INDEX public.idx_clscope_role;
       public            postgres    false    225            �           1259    172369    idx_compo_config_compo    INDEX     [   CREATE INDEX idx_compo_config_compo ON public.component_config USING btree (component_id);
 *   DROP INDEX public.idx_compo_config_compo;
       public            postgres    false    233            �           1259    172370    idx_component_provider_type    INDEX     Z   CREATE INDEX idx_component_provider_type ON public.component USING btree (provider_type);
 /   DROP INDEX public.idx_component_provider_type;
       public            postgres    false    232            �           1259    172371    idx_component_realm    INDEX     M   CREATE INDEX idx_component_realm ON public.component USING btree (realm_id);
 '   DROP INDEX public.idx_component_realm;
       public            postgres    false    232            �           1259    172372    idx_composite    INDEX     M   CREATE INDEX idx_composite ON public.composite_role USING btree (composite);
 !   DROP INDEX public.idx_composite;
       public            postgres    false    234            �           1259    172373    idx_composite_child    INDEX     T   CREATE INDEX idx_composite_child ON public.composite_role USING btree (child_role);
 '   DROP INDEX public.idx_composite_child;
       public            postgres    false    234            �           1259    172374    idx_defcls_realm    INDEX     U   CREATE INDEX idx_defcls_realm ON public.default_client_scope USING btree (realm_id);
 $   DROP INDEX public.idx_defcls_realm;
       public            postgres    false    238            �           1259    172375    idx_defcls_scope    INDEX     U   CREATE INDEX idx_defcls_scope ON public.default_client_scope USING btree (scope_id);
 $   DROP INDEX public.idx_defcls_scope;
       public            postgres    false    238            �           1259    172376    idx_event_time    INDEX     W   CREATE INDEX idx_event_time ON public.event_entity USING btree (realm_id, event_time);
 "   DROP INDEX public.idx_event_time;
       public            postgres    false    239    239            �           1259    172377    idx_fedidentity_feduser    INDEX     c   CREATE INDEX idx_fedidentity_feduser ON public.federated_identity USING btree (federated_user_id);
 +   DROP INDEX public.idx_fedidentity_feduser;
       public            postgres    false    247            �           1259    172378    idx_fedidentity_user    INDEX     V   CREATE INDEX idx_fedidentity_user ON public.federated_identity USING btree (user_id);
 (   DROP INDEX public.idx_fedidentity_user;
       public            postgres    false    247            �           1259    172379    idx_fu_attribute    INDEX     b   CREATE INDEX idx_fu_attribute ON public.fed_user_attribute USING btree (user_id, realm_id, name);
 $   DROP INDEX public.idx_fu_attribute;
       public            postgres    false    240    240    240            �           1259    172380    idx_fu_cnsnt_ext    INDEX     }   CREATE INDEX idx_fu_cnsnt_ext ON public.fed_user_consent USING btree (user_id, client_storage_provider, external_client_id);
 $   DROP INDEX public.idx_fu_cnsnt_ext;
       public            postgres    false    241    241    241            �           1259    172381    idx_fu_consent    INDEX     Y   CREATE INDEX idx_fu_consent ON public.fed_user_consent USING btree (user_id, client_id);
 "   DROP INDEX public.idx_fu_consent;
       public            postgres    false    241    241            �           1259    172382    idx_fu_consent_ru    INDEX     [   CREATE INDEX idx_fu_consent_ru ON public.fed_user_consent USING btree (realm_id, user_id);
 %   DROP INDEX public.idx_fu_consent_ru;
       public            postgres    false    241    241            �           1259    172383    idx_fu_credential    INDEX     Z   CREATE INDEX idx_fu_credential ON public.fed_user_credential USING btree (user_id, type);
 %   DROP INDEX public.idx_fu_credential;
       public            postgres    false    243    243            �           1259    172384    idx_fu_credential_ru    INDEX     a   CREATE INDEX idx_fu_credential_ru ON public.fed_user_credential USING btree (realm_id, user_id);
 (   DROP INDEX public.idx_fu_credential_ru;
       public            postgres    false    243    243            �           1259    172385    idx_fu_group_membership    INDEX     j   CREATE INDEX idx_fu_group_membership ON public.fed_user_group_membership USING btree (user_id, group_id);
 +   DROP INDEX public.idx_fu_group_membership;
       public            postgres    false    244    244            �           1259    172386    idx_fu_group_membership_ru    INDEX     m   CREATE INDEX idx_fu_group_membership_ru ON public.fed_user_group_membership USING btree (realm_id, user_id);
 .   DROP INDEX public.idx_fu_group_membership_ru;
       public            postgres    false    244    244            �           1259    172387    idx_fu_required_action    INDEX     o   CREATE INDEX idx_fu_required_action ON public.fed_user_required_action USING btree (user_id, required_action);
 *   DROP INDEX public.idx_fu_required_action;
       public            postgres    false    245    245            �           1259    172388    idx_fu_required_action_ru    INDEX     k   CREATE INDEX idx_fu_required_action_ru ON public.fed_user_required_action USING btree (realm_id, user_id);
 -   DROP INDEX public.idx_fu_required_action_ru;
       public            postgres    false    245    245            �           1259    172389    idx_fu_role_mapping    INDEX     a   CREATE INDEX idx_fu_role_mapping ON public.fed_user_role_mapping USING btree (user_id, role_id);
 '   DROP INDEX public.idx_fu_role_mapping;
       public            postgres    false    246    246            �           1259    172390    idx_fu_role_mapping_ru    INDEX     e   CREATE INDEX idx_fu_role_mapping_ru ON public.fed_user_role_mapping USING btree (realm_id, user_id);
 *   DROP INDEX public.idx_fu_role_mapping_ru;
       public            postgres    false    246    246            �           1259    172391    idx_group_attr_group    INDEX     T   CREATE INDEX idx_group_attr_group ON public.group_attribute USING btree (group_id);
 (   DROP INDEX public.idx_group_attr_group;
       public            postgres    false    249            �           1259    172392    idx_group_role_mapp_group    INDEX     \   CREATE INDEX idx_group_role_mapp_group ON public.group_role_mapping USING btree (group_id);
 -   DROP INDEX public.idx_group_role_mapp_group;
       public            postgres    false    250            �           1259    172393    idx_id_prov_mapp_realm    INDEX     _   CREATE INDEX idx_id_prov_mapp_realm ON public.identity_provider_mapper USING btree (realm_id);
 *   DROP INDEX public.idx_id_prov_mapp_realm;
       public            postgres    false    253            �           1259    172394    idx_ident_prov_realm    INDEX     V   CREATE INDEX idx_ident_prov_realm ON public.identity_provider USING btree (realm_id);
 (   DROP INDEX public.idx_ident_prov_realm;
       public            postgres    false    251                       1259    172395    idx_keycloak_role_client    INDEX     T   CREATE INDEX idx_keycloak_role_client ON public.keycloak_role USING btree (client);
 ,   DROP INDEX public.idx_keycloak_role_client;
       public            postgres    false    256                       1259    172396    idx_keycloak_role_realm    INDEX     R   CREATE INDEX idx_keycloak_role_realm ON public.keycloak_role USING btree (realm);
 +   DROP INDEX public.idx_keycloak_role_realm;
       public            postgres    false    256                       1259    172397    idx_offline_uss_createdon    INDEX     `   CREATE INDEX idx_offline_uss_createdon ON public.offline_user_session USING btree (created_on);
 -   DROP INDEX public.idx_offline_uss_createdon;
       public            postgres    false    259                       1259    172398    idx_protocol_mapper_client    INDEX     [   CREATE INDEX idx_protocol_mapper_client ON public.protocol_mapper USING btree (client_id);
 .   DROP INDEX public.idx_protocol_mapper_client;
       public            postgres    false    261            !           1259    172399    idx_realm_attr_realm    INDEX     T   CREATE INDEX idx_realm_attr_realm ON public.realm_attribute USING btree (realm_id);
 (   DROP INDEX public.idx_realm_attr_realm;
       public            postgres    false    264            �           1259    172400    idx_realm_clscope    INDEX     N   CREATE INDEX idx_realm_clscope ON public.client_scope USING btree (realm_id);
 %   DROP INDEX public.idx_realm_clscope;
       public            postgres    false    222            &           1259    172401    idx_realm_def_grp_realm    INDEX     \   CREATE INDEX idx_realm_def_grp_realm ON public.realm_default_groups USING btree (realm_id);
 +   DROP INDEX public.idx_realm_def_grp_realm;
       public            postgres    false    265            )           1259    172402    idx_realm_def_roles_realm    INDEX     ]   CREATE INDEX idx_realm_def_roles_realm ON public.realm_default_roles USING btree (realm_id);
 -   DROP INDEX public.idx_realm_def_roles_realm;
       public            postgres    false    266            1           1259    172403    idx_realm_evt_list_realm    INDEX     _   CREATE INDEX idx_realm_evt_list_realm ON public.realm_events_listeners USING btree (realm_id);
 ,   DROP INDEX public.idx_realm_evt_list_realm;
       public            postgres    false    268            .           1259    172404    idx_realm_evt_types_realm    INDEX     c   CREATE INDEX idx_realm_evt_types_realm ON public.realm_enabled_event_types USING btree (realm_id);
 -   DROP INDEX public.idx_realm_evt_types_realm;
       public            postgres    false    267                       1259    172405    idx_realm_master_adm_cli    INDEX     Y   CREATE INDEX idx_realm_master_adm_cli ON public.realm USING btree (master_admin_client);
 ,   DROP INDEX public.idx_realm_master_adm_cli;
       public            postgres    false    263            :           1259    172406    idx_realm_supp_local_realm    INDEX     b   CREATE INDEX idx_realm_supp_local_realm ON public.realm_supported_locales USING btree (realm_id);
 .   DROP INDEX public.idx_realm_supp_local_realm;
       public            postgres    false    272            =           1259    172407    idx_redir_uri_client    INDEX     S   CREATE INDEX idx_redir_uri_client ON public.redirect_uris USING btree (client_id);
 (   DROP INDEX public.idx_redir_uri_client;
       public            postgres    false    273            B           1259    172408    idx_req_act_prov_realm    INDEX     _   CREATE INDEX idx_req_act_prov_realm ON public.required_action_provider USING btree (realm_id);
 *   DROP INDEX public.idx_req_act_prov_realm;
       public            postgres    false    275            G           1259    172409    idx_res_policy_policy    INDEX     V   CREATE INDEX idx_res_policy_policy ON public.resource_policy USING btree (policy_id);
 )   DROP INDEX public.idx_res_policy_policy;
       public            postgres    false    277            J           1259    172410    idx_res_scope_scope    INDEX     R   CREATE INDEX idx_res_scope_scope ON public.resource_scope USING btree (scope_id);
 '   DROP INDEX public.idx_res_scope_scope;
       public            postgres    false    278            S           1259    172411    idx_res_serv_pol_res_serv    INDEX     j   CREATE INDEX idx_res_serv_pol_res_serv ON public.resource_server_policy USING btree (resource_server_id);
 -   DROP INDEX public.idx_res_serv_pol_res_serv;
       public            postgres    false    281            X           1259    172412    idx_res_srv_res_res_srv    INDEX     j   CREATE INDEX idx_res_srv_res_res_srv ON public.resource_server_resource USING btree (resource_server_id);
 +   DROP INDEX public.idx_res_srv_res_res_srv;
       public            postgres    false    282            ]           1259    172413    idx_res_srv_scope_res_srv    INDEX     i   CREATE INDEX idx_res_srv_scope_res_srv ON public.resource_server_scope USING btree (resource_server_id);
 -   DROP INDEX public.idx_res_srv_scope_res_srv;
       public            postgres    false    283            d           1259    172414    idx_role_attribute    INDEX     P   CREATE INDEX idx_role_attribute ON public.role_attribute USING btree (role_id);
 &   DROP INDEX public.idx_role_attribute;
       public            postgres    false    285            �           1259    172415    idx_role_clscope    INDEX     Y   CREATE INDEX idx_role_clscope ON public.client_scope_role_mapping USING btree (role_id);
 $   DROP INDEX public.idx_role_clscope;
       public            postgres    false    225            g           1259    172416    idx_scope_mapping_role    INDEX     S   CREATE INDEX idx_scope_mapping_role ON public.scope_mapping USING btree (role_id);
 *   DROP INDEX public.idx_scope_mapping_role;
       public            postgres    false    286            j           1259    172417    idx_scope_policy_policy    INDEX     U   CREATE INDEX idx_scope_policy_policy ON public.scope_policy USING btree (policy_id);
 +   DROP INDEX public.idx_scope_policy_policy;
       public            postgres    false    287                       1259    172418    idx_update_time    INDEX     R   CREATE INDEX idx_update_time ON public.migration_model USING btree (update_time);
 #   DROP INDEX public.idx_update_time;
       public            postgres    false    257                       1259    172419    idx_us_sess_id_on_cl_sess    INDEX     g   CREATE INDEX idx_us_sess_id_on_cl_sess ON public.offline_client_session USING btree (user_session_id);
 -   DROP INDEX public.idx_us_sess_id_on_cl_sess;
       public            postgres    false    258            u           1259    172420    idx_usconsent_clscope    INDEX     f   CREATE INDEX idx_usconsent_clscope ON public.user_consent_client_scope USING btree (user_consent_id);
 )   DROP INDEX public.idx_usconsent_clscope;
       public            postgres    false    290            m           1259    172421    idx_user_attribute    INDEX     P   CREATE INDEX idx_user_attribute ON public.user_attribute USING btree (user_id);
 &   DROP INDEX public.idx_user_attribute;
       public            postgres    false    288            p           1259    172422    idx_user_consent    INDEX     L   CREATE INDEX idx_user_consent ON public.user_consent USING btree (user_id);
 $   DROP INDEX public.idx_user_consent;
       public            postgres    false    289            �           1259    172423    idx_user_credential    INDEX     M   CREATE INDEX idx_user_credential ON public.credential USING btree (user_id);
 '   DROP INDEX public.idx_user_credential;
       public            postgres    false    235            x           1259    172424    idx_user_email    INDEX     G   CREATE INDEX idx_user_email ON public.user_entity USING btree (email);
 "   DROP INDEX public.idx_user_email;
       public            postgres    false    291            �           1259    172425    idx_user_group_mapping    INDEX     [   CREATE INDEX idx_user_group_mapping ON public.user_group_membership USING btree (user_id);
 *   DROP INDEX public.idx_user_group_mapping;
       public            postgres    false    296            �           1259    172426    idx_user_reqactions    INDEX     W   CREATE INDEX idx_user_reqactions ON public.user_required_action USING btree (user_id);
 '   DROP INDEX public.idx_user_reqactions;
       public            postgres    false    297            �           1259    172427    idx_user_role_mapping    INDEX     V   CREATE INDEX idx_user_role_mapping ON public.user_role_mapping USING btree (user_id);
 )   DROP INDEX public.idx_user_role_mapping;
       public            postgres    false    298            �           1259    172428    idx_usr_fed_map_fed_prv    INDEX     l   CREATE INDEX idx_usr_fed_map_fed_prv ON public.user_federation_mapper USING btree (federation_provider_id);
 +   DROP INDEX public.idx_usr_fed_map_fed_prv;
       public            postgres    false    293            �           1259    172429    idx_usr_fed_map_realm    INDEX     \   CREATE INDEX idx_usr_fed_map_realm ON public.user_federation_mapper USING btree (realm_id);
 )   DROP INDEX public.idx_usr_fed_map_realm;
       public            postgres    false    293            �           1259    172430    idx_usr_fed_prv_realm    INDEX     ^   CREATE INDEX idx_usr_fed_prv_realm ON public.user_federation_provider USING btree (realm_id);
 )   DROP INDEX public.idx_usr_fed_prv_realm;
       public            postgres    false    295            �           1259    172431    idx_web_orig_client    INDEX     P   CREATE INDEX idx_web_orig_client ON public.web_origins USING btree (client_id);
 '   DROP INDEX public.idx_web_orig_client;
       public            postgres    false    302            �           2606    172432 1   client_session_auth_status auth_status_constraint    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_session_auth_status
    ADD CONSTRAINT auth_status_constraint FOREIGN KEY (client_session) REFERENCES public.client_session(id);
 [   ALTER TABLE ONLY public.client_session_auth_status DROP CONSTRAINT auth_status_constraint;
       public          postgres    false    226    227    3754            �           2606    172437 $   identity_provider fk2b4ebc52ae5c3b34    FK CONSTRAINT     �   ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT fk2b4ebc52ae5c3b34 FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 N   ALTER TABLE ONLY public.identity_provider DROP CONSTRAINT fk2b4ebc52ae5c3b34;
       public          postgres    false    251    263    3867                       2606    180301 "   projet fk2gj4m2o4dndcymyr3rrobr2el    FK CONSTRAINT     �   ALTER TABLE ONLY public.projet
    ADD CONSTRAINT fk2gj4m2o4dndcymyr3rrobr2el FOREIGN KEY (id_responsable) REFERENCES public.user_entity(id);
 L   ALTER TABLE ONLY public.projet DROP CONSTRAINT fk2gj4m2o4dndcymyr3rrobr2el;
       public          postgres    false    316    291    3959            �           2606    172442 $   client_attributes fk3c47c64beacca966    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_attributes
    ADD CONSTRAINT fk3c47c64beacca966 FOREIGN KEY (client_id) REFERENCES public.client(id);
 N   ALTER TABLE ONLY public.client_attributes DROP CONSTRAINT fk3c47c64beacca966;
       public          postgres    false    216    3719    217            �           2606    172447 %   federated_identity fk404288b92ef007a6    FK CONSTRAINT     �   ALTER TABLE ONLY public.federated_identity
    ADD CONSTRAINT fk404288b92ef007a6 FOREIGN KEY (user_id) REFERENCES public.user_entity(id);
 O   ALTER TABLE ONLY public.federated_identity DROP CONSTRAINT fk404288b92ef007a6;
       public          postgres    false    291    247    3959            �           2606    172452 ,   client_node_registrations fk4129723ba992f594    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_node_registrations
    ADD CONSTRAINT fk4129723ba992f594 FOREIGN KEY (client_id) REFERENCES public.client(id);
 V   ALTER TABLE ONLY public.client_node_registrations DROP CONSTRAINT fk4129723ba992f594;
       public          postgres    false    216    3719    221                       2606    180236 '   commentaire fk4hi0epbilwpk3yxf7b9vqv949    FK CONSTRAINT     �   ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT fk4hi0epbilwpk3yxf7b9vqv949 FOREIGN KEY (id_createur) REFERENCES public.user_entity(id);
 Q   ALTER TABLE ONLY public.commentaire DROP CONSTRAINT fk4hi0epbilwpk3yxf7b9vqv949;
       public          postgres    false    304    3959    291            "           2606    180291 !   tache fk59rtkixw294n3172drrjebach    FK CONSTRAINT     �   ALTER TABLE ONLY public.tache
    ADD CONSTRAINT fk59rtkixw294n3172drrjebach FOREIGN KEY (id_responsable) REFERENCES public.user_entity(id);
 K   ALTER TABLE ONLY public.tache DROP CONSTRAINT fk59rtkixw294n3172drrjebach;
       public          postgres    false    291    3959    322            �           2606    172462 &   client_session_note fk5edfb00ff51c2736    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_session_note
    ADD CONSTRAINT fk5edfb00ff51c2736 FOREIGN KEY (client_session) REFERENCES public.client_session(id);
 P   ALTER TABLE ONLY public.client_session_note DROP CONSTRAINT fk5edfb00ff51c2736;
       public          postgres    false    228    226    3754                       2606    172467 $   user_session_note fk5edfb00ff51d3472    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_session_note
    ADD CONSTRAINT fk5edfb00ff51d3472 FOREIGN KEY (user_session) REFERENCES public.user_session(id);
 N   ALTER TABLE ONLY public.user_session_note DROP CONSTRAINT fk5edfb00ff51d3472;
       public          postgres    false    299    3986    300                       2606    180251 (   notification fk5r13ym93crqnodhya9wn8ki8j    FK CONSTRAINT     �   ALTER TABLE ONLY public.notification
    ADD CONSTRAINT fk5r13ym93crqnodhya9wn8ki8j FOREIGN KEY (id_destinataire) REFERENCES public.user_entity(id);
 R   ALTER TABLE ONLY public.notification DROP CONSTRAINT fk5r13ym93crqnodhya9wn8ki8j;
       public          postgres    false    3959    314    291            !           2606    180286 !   tache fk6qobmvaehwaj6hnldawo1mqsy    FK CONSTRAINT     �   ALTER TABLE ONLY public.tache
    ADD CONSTRAINT fk6qobmvaehwaj6hnldawo1mqsy FOREIGN KEY (id_projet) REFERENCES public.projet(id_projet);
 K   ALTER TABLE ONLY public.tache DROP CONSTRAINT fk6qobmvaehwaj6hnldawo1mqsy;
       public          postgres    false    4015    316    322                       2606    180231 '   commentaire fk7ugqws9bmv7fi38tta4dkeb98    FK CONSTRAINT     �   ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT fk7ugqws9bmv7fi38tta4dkeb98 FOREIGN KEY (id_tache) REFERENCES public.tache(id_tache);
 Q   ALTER TABLE ONLY public.commentaire DROP CONSTRAINT fk7ugqws9bmv7fi38tta4dkeb98;
       public          postgres    false    322    304    4023            �           2606    172477 0   client_session_role fk_11b7sgqw18i532811v7o2dv76    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_session_role
    ADD CONSTRAINT fk_11b7sgqw18i532811v7o2dv76 FOREIGN KEY (client_session) REFERENCES public.client_session(id);
 Z   ALTER TABLE ONLY public.client_session_role DROP CONSTRAINT fk_11b7sgqw18i532811v7o2dv76;
       public          postgres    false    3754    226    230            �           2606    172482 *   redirect_uris fk_1burs8pb4ouj97h5wuppahv9f    FK CONSTRAINT     �   ALTER TABLE ONLY public.redirect_uris
    ADD CONSTRAINT fk_1burs8pb4ouj97h5wuppahv9f FOREIGN KEY (client_id) REFERENCES public.client(id);
 T   ALTER TABLE ONLY public.redirect_uris DROP CONSTRAINT fk_1burs8pb4ouj97h5wuppahv9f;
       public          postgres    false    273    216    3719                       2606    172487 5   user_federation_provider fk_1fj32f6ptolw2qy60cd8n01e8    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_federation_provider
    ADD CONSTRAINT fk_1fj32f6ptolw2qy60cd8n01e8 FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 _   ALTER TABLE ONLY public.user_federation_provider DROP CONSTRAINT fk_1fj32f6ptolw2qy60cd8n01e8;
       public          postgres    false    295    263    3867            �           2606    172492 7   client_session_prot_mapper fk_33a8sgqw18i532811v7o2dk89    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_session_prot_mapper
    ADD CONSTRAINT fk_33a8sgqw18i532811v7o2dk89 FOREIGN KEY (client_session) REFERENCES public.client_session(id);
 a   ALTER TABLE ONLY public.client_session_prot_mapper DROP CONSTRAINT fk_33a8sgqw18i532811v7o2dk89;
       public          postgres    false    226    229    3754            �           2606    172497 6   realm_required_credential fk_5hg65lybevavkqfki3kponh9v    FK CONSTRAINT     �   ALTER TABLE ONLY public.realm_required_credential
    ADD CONSTRAINT fk_5hg65lybevavkqfki3kponh9v FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 `   ALTER TABLE ONLY public.realm_required_credential DROP CONSTRAINT fk_5hg65lybevavkqfki3kponh9v;
       public          postgres    false    263    270    3867            �           2606    172502 /   resource_attribute fk_5hrm2vlf9ql5fu022kqepovbr    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_attribute
    ADD CONSTRAINT fk_5hrm2vlf9ql5fu022kqepovbr FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);
 Y   ALTER TABLE ONLY public.resource_attribute DROP CONSTRAINT fk_5hrm2vlf9ql5fu022kqepovbr;
       public          postgres    false    276    282    3927                       2606    172507 +   user_attribute fk_5hrm2vlf9ql5fu043kqepovbr    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_attribute
    ADD CONSTRAINT fk_5hrm2vlf9ql5fu043kqepovbr FOREIGN KEY (user_id) REFERENCES public.user_entity(id);
 U   ALTER TABLE ONLY public.user_attribute DROP CONSTRAINT fk_5hrm2vlf9ql5fu043kqepovbr;
       public          postgres    false    288    3959    291                       2606    172512 1   user_required_action fk_6qj3w1jw9cvafhe19bwsiuvmd    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_required_action
    ADD CONSTRAINT fk_6qj3w1jw9cvafhe19bwsiuvmd FOREIGN KEY (user_id) REFERENCES public.user_entity(id);
 [   ALTER TABLE ONLY public.user_required_action DROP CONSTRAINT fk_6qj3w1jw9cvafhe19bwsiuvmd;
       public          postgres    false    3959    297    291            �           2606    172517 *   keycloak_role fk_6vyqfe4cn4wlq8r6kt5vdsj5c    FK CONSTRAINT     �   ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT fk_6vyqfe4cn4wlq8r6kt5vdsj5c FOREIGN KEY (realm) REFERENCES public.realm(id);
 T   ALTER TABLE ONLY public.keycloak_role DROP CONSTRAINT fk_6vyqfe4cn4wlq8r6kt5vdsj5c;
       public          postgres    false    263    3867    256            �           2606    172522 .   realm_smtp_config fk_70ej8xdxgxd0b9hh6180irr0o    FK CONSTRAINT     �   ALTER TABLE ONLY public.realm_smtp_config
    ADD CONSTRAINT fk_70ej8xdxgxd0b9hh6180irr0o FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 X   ALTER TABLE ONLY public.realm_smtp_config DROP CONSTRAINT fk_70ej8xdxgxd0b9hh6180irr0o;
       public          postgres    false    263    271    3867            �           2606    172527 ,   realm_attribute fk_8shxd6l3e9atqukacxgpffptw    FK CONSTRAINT     �   ALTER TABLE ONLY public.realm_attribute
    ADD CONSTRAINT fk_8shxd6l3e9atqukacxgpffptw FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 V   ALTER TABLE ONLY public.realm_attribute DROP CONSTRAINT fk_8shxd6l3e9atqukacxgpffptw;
       public          postgres    false    263    264    3867            �           2606    172532 +   composite_role fk_a63wvekftu8jo1pnj81e7mce2    FK CONSTRAINT     �   ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT fk_a63wvekftu8jo1pnj81e7mce2 FOREIGN KEY (composite) REFERENCES public.keycloak_role(id);
 U   ALTER TABLE ONLY public.composite_role DROP CONSTRAINT fk_a63wvekftu8jo1pnj81e7mce2;
       public          postgres    false    234    3846    256            �           2606    172537 *   authentication_execution fk_auth_exec_flow    FK CONSTRAINT     �   ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT fk_auth_exec_flow FOREIGN KEY (flow_id) REFERENCES public.authentication_flow(id);
 T   ALTER TABLE ONLY public.authentication_execution DROP CONSTRAINT fk_auth_exec_flow;
       public          postgres    false    3709    212    211            �           2606    172542 +   authentication_execution fk_auth_exec_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT fk_auth_exec_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 U   ALTER TABLE ONLY public.authentication_execution DROP CONSTRAINT fk_auth_exec_realm;
       public          postgres    false    263    3867    211            �           2606    172547 &   authentication_flow fk_auth_flow_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.authentication_flow
    ADD CONSTRAINT fk_auth_flow_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 P   ALTER TABLE ONLY public.authentication_flow DROP CONSTRAINT fk_auth_flow_realm;
       public          postgres    false    212    263    3867            �           2606    172552 "   authenticator_config fk_auth_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.authenticator_config
    ADD CONSTRAINT fk_auth_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 L   ALTER TABLE ONLY public.authenticator_config DROP CONSTRAINT fk_auth_realm;
       public          postgres    false    213    3867    263            �           2606    172557 +   client_session fk_b4ao2vcvat6ukau74wbwtfqo1    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT fk_b4ao2vcvat6ukau74wbwtfqo1 FOREIGN KEY (session_id) REFERENCES public.user_session(id);
 U   ALTER TABLE ONLY public.client_session DROP CONSTRAINT fk_b4ao2vcvat6ukau74wbwtfqo1;
       public          postgres    false    226    299    3986                       2606    172562 .   user_role_mapping fk_c4fqv34p1mbylloxang7b1q3l    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_role_mapping
    ADD CONSTRAINT fk_c4fqv34p1mbylloxang7b1q3l FOREIGN KEY (user_id) REFERENCES public.user_entity(id);
 X   ALTER TABLE ONLY public.user_role_mapping DROP CONSTRAINT fk_c4fqv34p1mbylloxang7b1q3l;
       public          postgres    false    3959    298    291            �           2606    172567 )   client_scope_client fk_c_cli_scope_client    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_scope_client
    ADD CONSTRAINT fk_c_cli_scope_client FOREIGN KEY (client_id) REFERENCES public.client(id);
 S   ALTER TABLE ONLY public.client_scope_client DROP CONSTRAINT fk_c_cli_scope_client;
       public          postgres    false    216    3719    224            �           2606    172572 (   client_scope_client fk_c_cli_scope_scope    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_scope_client
    ADD CONSTRAINT fk_c_cli_scope_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);
 R   ALTER TABLE ONLY public.client_scope_client DROP CONSTRAINT fk_c_cli_scope_scope;
       public          postgres    false    222    224    3739            �           2606    172577 .   client_scope_attributes fk_cl_scope_attr_scope    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_scope_attributes
    ADD CONSTRAINT fk_cl_scope_attr_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);
 X   ALTER TABLE ONLY public.client_scope_attributes DROP CONSTRAINT fk_cl_scope_attr_scope;
       public          postgres    false    3739    223    222            �           2606    172582 .   client_scope_role_mapping fk_cl_scope_rm_scope    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_scope_role_mapping
    ADD CONSTRAINT fk_cl_scope_rm_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);
 X   ALTER TABLE ONLY public.client_scope_role_mapping DROP CONSTRAINT fk_cl_scope_rm_scope;
       public          postgres    false    225    3739    222            �           2606    172587 +   client_user_session_note fk_cl_usr_ses_note    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_user_session_note
    ADD CONSTRAINT fk_cl_usr_ses_note FOREIGN KEY (client_session) REFERENCES public.client_session(id);
 U   ALTER TABLE ONLY public.client_user_session_note DROP CONSTRAINT fk_cl_usr_ses_note;
       public          postgres    false    231    226    3754            �           2606    172592 #   protocol_mapper fk_cli_scope_mapper    FK CONSTRAINT     �   ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT fk_cli_scope_mapper FOREIGN KEY (client_scope_id) REFERENCES public.client_scope(id);
 M   ALTER TABLE ONLY public.protocol_mapper DROP CONSTRAINT fk_cli_scope_mapper;
       public          postgres    false    222    261    3739            �           2606    172597 .   client_initial_access fk_client_init_acc_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_initial_access
    ADD CONSTRAINT fk_client_init_acc_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 X   ALTER TABLE ONLY public.client_initial_access DROP CONSTRAINT fk_client_init_acc_realm;
       public          postgres    false    263    3867    220            �           2606    172602 $   component_config fk_component_config    FK CONSTRAINT     �   ALTER TABLE ONLY public.component_config
    ADD CONSTRAINT fk_component_config FOREIGN KEY (component_id) REFERENCES public.component(id);
 N   ALTER TABLE ONLY public.component_config DROP CONSTRAINT fk_component_config;
       public          postgres    false    233    232    3767            �           2606    172607    component fk_component_realm    FK CONSTRAINT     |   ALTER TABLE ONLY public.component
    ADD CONSTRAINT fk_component_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 F   ALTER TABLE ONLY public.component DROP CONSTRAINT fk_component_realm;
       public          postgres    false    232    3867    263            �           2606    172612 (   realm_default_groups fk_def_groups_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT fk_def_groups_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 R   ALTER TABLE ONLY public.realm_default_groups DROP CONSTRAINT fk_def_groups_realm;
       public          postgres    false    265    3867    263            �           2606    172617 0   realm_default_roles fk_evudb1ppw84oxfax2drs03icc    FK CONSTRAINT     �   ALTER TABLE ONLY public.realm_default_roles
    ADD CONSTRAINT fk_evudb1ppw84oxfax2drs03icc FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 Z   ALTER TABLE ONLY public.realm_default_roles DROP CONSTRAINT fk_evudb1ppw84oxfax2drs03icc;
       public          postgres    false    266    3867    263                       2606    172622 .   user_federation_mapper_config fk_fedmapper_cfg    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_federation_mapper_config
    ADD CONSTRAINT fk_fedmapper_cfg FOREIGN KEY (user_federation_mapper_id) REFERENCES public.user_federation_mapper(id);
 X   ALTER TABLE ONLY public.user_federation_mapper_config DROP CONSTRAINT fk_fedmapper_cfg;
       public          postgres    false    294    293    3968                       2606    172627 ,   user_federation_mapper fk_fedmapperpm_fedprv    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT fk_fedmapperpm_fedprv FOREIGN KEY (federation_provider_id) REFERENCES public.user_federation_provider(id);
 V   ALTER TABLE ONLY public.user_federation_mapper DROP CONSTRAINT fk_fedmapperpm_fedprv;
       public          postgres    false    295    3974    293                       2606    172632 +   user_federation_mapper fk_fedmapperpm_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT fk_fedmapperpm_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 U   ALTER TABLE ONLY public.user_federation_mapper DROP CONSTRAINT fk_fedmapperpm_realm;
       public          postgres    false    3867    293    263            �           2606    172637 .   associated_policy fk_frsr5s213xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT fk_frsr5s213xcx4wnkog82ssrfy FOREIGN KEY (associated_policy_id) REFERENCES public.resource_server_policy(id);
 X   ALTER TABLE ONLY public.associated_policy DROP CONSTRAINT fk_frsr5s213xcx4wnkog82ssrfy;
       public          postgres    false    3922    210    281                       2606    172642 )   scope_policy fk_frsrasp13xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT fk_frsrasp13xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);
 S   ALTER TABLE ONLY public.scope_policy DROP CONSTRAINT fk_frsrasp13xcx4wnkog82ssrfy;
       public          postgres    false    287    3922    281            �           2606    172647 8   resource_server_perm_ticket fk_frsrho213xcx4wnkog82sspmt    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog82sspmt FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);
 b   ALTER TABLE ONLY public.resource_server_perm_ticket DROP CONSTRAINT fk_frsrho213xcx4wnkog82sspmt;
       public          postgres    false    3916    280    279                        2606    172652 5   resource_server_resource fk_frsrho213xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT fk_frsrho213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);
 _   ALTER TABLE ONLY public.resource_server_resource DROP CONSTRAINT fk_frsrho213xcx4wnkog82ssrfy;
       public          postgres    false    279    282    3916            �           2606    172657 8   resource_server_perm_ticket fk_frsrho213xcx4wnkog83sspmt    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog83sspmt FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);
 b   ALTER TABLE ONLY public.resource_server_perm_ticket DROP CONSTRAINT fk_frsrho213xcx4wnkog83sspmt;
       public          postgres    false    280    3927    282            �           2606    172662 8   resource_server_perm_ticket fk_frsrho213xcx4wnkog84sspmt    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog84sspmt FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);
 b   ALTER TABLE ONLY public.resource_server_perm_ticket DROP CONSTRAINT fk_frsrho213xcx4wnkog84sspmt;
       public          postgres    false    280    283    3932            �           2606    172667 .   associated_policy fk_frsrpas14xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT fk_frsrpas14xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);
 X   ALTER TABLE ONLY public.associated_policy DROP CONSTRAINT fk_frsrpas14xcx4wnkog82ssrfy;
       public          postgres    false    210    281    3922                       2606    172672 )   scope_policy fk_frsrpass3xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT fk_frsrpass3xcx4wnkog82ssrfy FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);
 S   ALTER TABLE ONLY public.scope_policy DROP CONSTRAINT fk_frsrpass3xcx4wnkog82ssrfy;
       public          postgres    false    287    283    3932            �           2606    172677 8   resource_server_perm_ticket fk_frsrpo2128cx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrpo2128cx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);
 b   ALTER TABLE ONLY public.resource_server_perm_ticket DROP CONSTRAINT fk_frsrpo2128cx4wnkog82ssrfy;
       public          postgres    false    281    3922    280            �           2606    172682 3   resource_server_policy fk_frsrpo213xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT fk_frsrpo213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);
 ]   ALTER TABLE ONLY public.resource_server_policy DROP CONSTRAINT fk_frsrpo213xcx4wnkog82ssrfy;
       public          postgres    false    279    281    3916            �           2606    172687 +   resource_scope fk_frsrpos13xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT fk_frsrpos13xcx4wnkog82ssrfy FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);
 U   ALTER TABLE ONLY public.resource_scope DROP CONSTRAINT fk_frsrpos13xcx4wnkog82ssrfy;
       public          postgres    false    3927    282    278            �           2606    172692 ,   resource_policy fk_frsrpos53xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT fk_frsrpos53xcx4wnkog82ssrfy FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);
 V   ALTER TABLE ONLY public.resource_policy DROP CONSTRAINT fk_frsrpos53xcx4wnkog82ssrfy;
       public          postgres    false    277    3927    282            �           2606    172697 ,   resource_policy fk_frsrpp213xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT fk_frsrpp213xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);
 V   ALTER TABLE ONLY public.resource_policy DROP CONSTRAINT fk_frsrpp213xcx4wnkog82ssrfy;
       public          postgres    false    281    277    3922            �           2606    172702 +   resource_scope fk_frsrps213xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT fk_frsrps213xcx4wnkog82ssrfy FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);
 U   ALTER TABLE ONLY public.resource_scope DROP CONSTRAINT fk_frsrps213xcx4wnkog82ssrfy;
       public          postgres    false    278    3932    283                       2606    172707 2   resource_server_scope fk_frsrso213xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT fk_frsrso213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);
 \   ALTER TABLE ONLY public.resource_server_scope DROP CONSTRAINT fk_frsrso213xcx4wnkog82ssrfy;
       public          postgres    false    3916    279    283            �           2606    172712 +   composite_role fk_gr7thllb9lu8q4vqa4524jjy8    FK CONSTRAINT     �   ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT fk_gr7thllb9lu8q4vqa4524jjy8 FOREIGN KEY (child_role) REFERENCES public.keycloak_role(id);
 U   ALTER TABLE ONLY public.composite_role DROP CONSTRAINT fk_gr7thllb9lu8q4vqa4524jjy8;
       public          postgres    false    234    3846    256            	           2606    172717 .   user_consent_client_scope fk_grntcsnt_clsc_usc    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_consent_client_scope
    ADD CONSTRAINT fk_grntcsnt_clsc_usc FOREIGN KEY (user_consent_id) REFERENCES public.user_consent(id);
 X   ALTER TABLE ONLY public.user_consent_client_scope DROP CONSTRAINT fk_grntcsnt_clsc_usc;
       public          postgres    false    290    289    3951                       2606    172722    user_consent fk_grntcsnt_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT fk_grntcsnt_user FOREIGN KEY (user_id) REFERENCES public.user_entity(id);
 G   ALTER TABLE ONLY public.user_consent DROP CONSTRAINT fk_grntcsnt_user;
       public          postgres    false    3959    289    291            �           2606    172727 (   group_attribute fk_group_attribute_group    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT fk_group_attribute_group FOREIGN KEY (group_id) REFERENCES public.keycloak_group(id);
 R   ALTER TABLE ONLY public.group_attribute DROP CONSTRAINT fk_group_attribute_group;
       public          postgres    false    255    249    3840            �           2606    172732    keycloak_group fk_group_realm    FK CONSTRAINT     }   ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT fk_group_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 G   ALTER TABLE ONLY public.keycloak_group DROP CONSTRAINT fk_group_realm;
       public          postgres    false    263    255    3867            �           2606    172737 &   group_role_mapping fk_group_role_group    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_role_mapping
    ADD CONSTRAINT fk_group_role_group FOREIGN KEY (group_id) REFERENCES public.keycloak_group(id);
 P   ALTER TABLE ONLY public.group_role_mapping DROP CONSTRAINT fk_group_role_group;
       public          postgres    false    3840    250    255            �           2606    172742 6   realm_enabled_event_types fk_h846o4h0w8epx5nwedrf5y69j    FK CONSTRAINT     �   ALTER TABLE ONLY public.realm_enabled_event_types
    ADD CONSTRAINT fk_h846o4h0w8epx5nwedrf5y69j FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 `   ALTER TABLE ONLY public.realm_enabled_event_types DROP CONSTRAINT fk_h846o4h0w8epx5nwedrf5y69j;
       public          postgres    false    263    3867    267            �           2606    172747 3   realm_events_listeners fk_h846o4h0w8epx5nxev9f5y69j    FK CONSTRAINT     �   ALTER TABLE ONLY public.realm_events_listeners
    ADD CONSTRAINT fk_h846o4h0w8epx5nxev9f5y69j FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 ]   ALTER TABLE ONLY public.realm_events_listeners DROP CONSTRAINT fk_h846o4h0w8epx5nxev9f5y69j;
       public          postgres    false    268    263    3867            �           2606    172752 &   identity_provider_mapper fk_idpm_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.identity_provider_mapper
    ADD CONSTRAINT fk_idpm_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 P   ALTER TABLE ONLY public.identity_provider_mapper DROP CONSTRAINT fk_idpm_realm;
       public          postgres    false    3867    263    253            �           2606    172757    idp_mapper_config fk_idpmconfig    FK CONSTRAINT     �   ALTER TABLE ONLY public.idp_mapper_config
    ADD CONSTRAINT fk_idpmconfig FOREIGN KEY (idp_mapper_id) REFERENCES public.identity_provider_mapper(id);
 I   ALTER TABLE ONLY public.idp_mapper_config DROP CONSTRAINT fk_idpmconfig;
       public          postgres    false    254    253    3835                       2606    172762 (   web_origins fk_lojpho213xcx4wnkog82ssrfy    FK CONSTRAINT     �   ALTER TABLE ONLY public.web_origins
    ADD CONSTRAINT fk_lojpho213xcx4wnkog82ssrfy FOREIGN KEY (client_id) REFERENCES public.client(id);
 R   ALTER TABLE ONLY public.web_origins DROP CONSTRAINT fk_lojpho213xcx4wnkog82ssrfy;
       public          postgres    false    302    216    3719            �           2606    172767 1   client_default_roles fk_nuilts7klwqw2h8m2b5joytky    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_default_roles
    ADD CONSTRAINT fk_nuilts7klwqw2h8m2b5joytky FOREIGN KEY (client_id) REFERENCES public.client(id);
 [   ALTER TABLE ONLY public.client_default_roles DROP CONSTRAINT fk_nuilts7klwqw2h8m2b5joytky;
       public          postgres    false    3719    219    216                       2606    172772 *   scope_mapping fk_ouse064plmlr732lxjcn1q5f1    FK CONSTRAINT     �   ALTER TABLE ONLY public.scope_mapping
    ADD CONSTRAINT fk_ouse064plmlr732lxjcn1q5f1 FOREIGN KEY (client_id) REFERENCES public.client(id);
 T   ALTER TABLE ONLY public.scope_mapping DROP CONSTRAINT fk_ouse064plmlr732lxjcn1q5f1;
       public          postgres    false    3719    286    216            �           2606    172777 #   client fk_p56ctinxxb9gsk57fo49f9tac    FK CONSTRAINT     �   ALTER TABLE ONLY public.client
    ADD CONSTRAINT fk_p56ctinxxb9gsk57fo49f9tac FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 M   ALTER TABLE ONLY public.client DROP CONSTRAINT fk_p56ctinxxb9gsk57fo49f9tac;
       public          postgres    false    263    3867    216            �           2606    172782    protocol_mapper fk_pcm_realm    FK CONSTRAINT     ~   ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT fk_pcm_realm FOREIGN KEY (client_id) REFERENCES public.client(id);
 F   ALTER TABLE ONLY public.protocol_mapper DROP CONSTRAINT fk_pcm_realm;
       public          postgres    false    261    3719    216            �           2606    172787 '   credential fk_pfyr0glasqyl0dei3kl69r6v0    FK CONSTRAINT     �   ALTER TABLE ONLY public.credential
    ADD CONSTRAINT fk_pfyr0glasqyl0dei3kl69r6v0 FOREIGN KEY (user_id) REFERENCES public.user_entity(id);
 Q   ALTER TABLE ONLY public.credential DROP CONSTRAINT fk_pfyr0glasqyl0dei3kl69r6v0;
       public          postgres    false    291    3959    235            �           2606    172792 "   protocol_mapper_config fk_pmconfig    FK CONSTRAINT     �   ALTER TABLE ONLY public.protocol_mapper_config
    ADD CONSTRAINT fk_pmconfig FOREIGN KEY (protocol_mapper_id) REFERENCES public.protocol_mapper(id);
 L   ALTER TABLE ONLY public.protocol_mapper_config DROP CONSTRAINT fk_pmconfig;
       public          postgres    false    262    261    3861            �           2606    172797 -   default_client_scope fk_r_def_cli_scope_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT fk_r_def_cli_scope_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 W   ALTER TABLE ONLY public.default_client_scope DROP CONSTRAINT fk_r_def_cli_scope_realm;
       public          postgres    false    3867    263    238            �           2606    172802 -   default_client_scope fk_r_def_cli_scope_scope    FK CONSTRAINT     �   ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT fk_r_def_cli_scope_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);
 W   ALTER TABLE ONLY public.default_client_scope DROP CONSTRAINT fk_r_def_cli_scope_scope;
       public          postgres    false    3739    238    222            �           2606    172807    client_scope fk_realm_cli_scope    FK CONSTRAINT        ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT fk_realm_cli_scope FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 I   ALTER TABLE ONLY public.client_scope DROP CONSTRAINT fk_realm_cli_scope;
       public          postgres    false    222    263    3867            �           2606    172812 )   required_action_provider fk_req_act_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.required_action_provider
    ADD CONSTRAINT fk_req_act_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 S   ALTER TABLE ONLY public.required_action_provider DROP CONSTRAINT fk_req_act_realm;
       public          postgres    false    275    263    3867                       2606    172817 %   resource_uris fk_resource_server_uris    FK CONSTRAINT     �   ALTER TABLE ONLY public.resource_uris
    ADD CONSTRAINT fk_resource_server_uris FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);
 O   ALTER TABLE ONLY public.resource_uris DROP CONSTRAINT fk_resource_server_uris;
       public          postgres    false    284    3927    282                       2606    172822 #   role_attribute fk_role_attribute_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_attribute
    ADD CONSTRAINT fk_role_attribute_id FOREIGN KEY (role_id) REFERENCES public.keycloak_role(id);
 M   ALTER TABLE ONLY public.role_attribute DROP CONSTRAINT fk_role_attribute_id;
       public          postgres    false    285    256    3846            �           2606    172827 2   realm_supported_locales fk_supported_locales_realm    FK CONSTRAINT     �   ALTER TABLE ONLY public.realm_supported_locales
    ADD CONSTRAINT fk_supported_locales_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);
 \   ALTER TABLE ONLY public.realm_supported_locales DROP CONSTRAINT fk_supported_locales_realm;
       public          postgres    false    263    3867    272            
           2606    172832 3   user_federation_config fk_t13hpu1j94r2ebpekr39x5eu5    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_federation_config
    ADD CONSTRAINT fk_t13hpu1j94r2ebpekr39x5eu5 FOREIGN KEY (user_federation_provider_id) REFERENCES public.user_federation_provider(id);
 ]   ALTER TABLE ONLY public.user_federation_config DROP CONSTRAINT fk_t13hpu1j94r2ebpekr39x5eu5;
       public          postgres    false    295    3974    292                       2606    172837 (   user_group_membership fk_user_group_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_group_membership
    ADD CONSTRAINT fk_user_group_user FOREIGN KEY (user_id) REFERENCES public.user_entity(id);
 R   ALTER TABLE ONLY public.user_group_membership DROP CONSTRAINT fk_user_group_user;
       public          postgres    false    296    3959    291                       2606    180226 '   commentaire fkawg8dsdvgg3lpt8l8ffg00qn9    FK CONSTRAINT     �   ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT fkawg8dsdvgg3lpt8l8ffg00qn9 FOREIGN KEY (id_soustache) REFERENCES public.soustache(id_soustache);
 Q   ALTER TABLE ONLY public.commentaire DROP CONSTRAINT fkawg8dsdvgg3lpt8l8ffg00qn9;
       public          postgres    false    318    4019    304            $           2606    188622 #   fichier fkc4pn9933t30qq2mmf1vqxe2pq    FK CONSTRAINT     �   ALTER TABLE ONLY public.fichier
    ADD CONSTRAINT fkc4pn9933t30qq2mmf1vqxe2pq FOREIGN KEY (id_commentaire) REFERENCES public.commentaire(id_commentaire);
 M   ALTER TABLE ONLY public.fichier DROP CONSTRAINT fkc4pn9933t30qq2mmf1vqxe2pq;
       public          postgres    false    332    304    3995                       2606    180276 %   soustache fkc6gxi65ew94iavuj4g9sgpo9e    FK CONSTRAINT     �   ALTER TABLE ONLY public.soustache
    ADD CONSTRAINT fkc6gxi65ew94iavuj4g9sgpo9e FOREIGN KEY (id_rapporteur) REFERENCES public.user_entity(id);
 O   ALTER TABLE ONLY public.soustache DROP CONSTRAINT fkc6gxi65ew94iavuj4g9sgpo9e;
       public          postgres    false    3959    291    318                       2606    180281 "   sprint fkce52wo05nyp4flw2gchuffjbs    FK CONSTRAINT     �   ALTER TABLE ONLY public.sprint
    ADD CONSTRAINT fkce52wo05nyp4flw2gchuffjbs FOREIGN KEY (idcreateur) REFERENCES public.user_entity(id);
 L   ALTER TABLE ONLY public.sprint DROP CONSTRAINT fkce52wo05nyp4flw2gchuffjbs;
       public          postgres    false    3959    320    291                       2606    180306 "   sprint fkd8nyfsdvqu7dwu06rltlf81yk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sprint
    ADD CONSTRAINT fkd8nyfsdvqu7dwu06rltlf81yk FOREIGN KEY (id_projet) REFERENCES public.projet(id_projet);
 L   ALTER TABLE ONLY public.sprint DROP CONSTRAINT fkd8nyfsdvqu7dwu06rltlf81yk;
       public          postgres    false    320    4015    316            �           2606    172842 !   policy_config fkdc34197cf864c4e43    FK CONSTRAINT     �   ALTER TABLE ONLY public.policy_config
    ADD CONSTRAINT fkdc34197cf864c4e43 FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);
 K   ALTER TABLE ONLY public.policy_config DROP CONSTRAINT fkdc34197cf864c4e43;
       public          postgres    false    260    3922    281            �           2606    172847 +   identity_provider_config fkdc4897cf864c4e43    FK CONSTRAINT     �   ALTER TABLE ONLY public.identity_provider_config
    ADD CONSTRAINT fkdc4897cf864c4e43 FOREIGN KEY (identity_provider_id) REFERENCES public.identity_provider(internal_id);
 U   ALTER TABLE ONLY public.identity_provider_config DROP CONSTRAINT fkdc4897cf864c4e43;
       public          postgres    false    251    3828    252                       2606    180256 "   projet fkf6d1q722bdqbbye5a621v578t    FK CONSTRAINT     �   ALTER TABLE ONLY public.projet
    ADD CONSTRAINT fkf6d1q722bdqbbye5a621v578t FOREIGN KEY (id_createur) REFERENCES public.user_entity(id);
 L   ALTER TABLE ONLY public.projet DROP CONSTRAINT fkf6d1q722bdqbbye5a621v578t;
       public          postgres    false    3959    316    291                       2606    180271 %   soustache fkgk5ya7q55a869gsvn3y0v2wlp    FK CONSTRAINT     �   ALTER TABLE ONLY public.soustache
    ADD CONSTRAINT fkgk5ya7q55a869gsvn3y0v2wlp FOREIGN KEY (id_responsable) REFERENCES public.user_entity(id);
 O   ALTER TABLE ONLY public.soustache DROP CONSTRAINT fkgk5ya7q55a869gsvn3y0v2wlp;
       public          postgres    false    318    291    3959                       2606    180266 %   soustache fkh3mkaxn095amhqb3ltj5h4jca    FK CONSTRAINT     �   ALTER TABLE ONLY public.soustache
    ADD CONSTRAINT fkh3mkaxn095amhqb3ltj5h4jca FOREIGN KEY (id_tache) REFERENCES public.tache(id_tache);
 O   ALTER TABLE ONLY public.soustache DROP CONSTRAINT fkh3mkaxn095amhqb3ltj5h4jca;
       public          postgres    false    4023    318    322                        2606    180362 "   sprint fkl586vm6j71b8e4yyq4460b8vm    FK CONSTRAINT     �   ALTER TABLE ONLY public.sprint
    ADD CONSTRAINT fkl586vm6j71b8e4yyq4460b8vm FOREIGN KEY (id_createur) REFERENCES public.user_entity(id);
 L   ALTER TABLE ONLY public.sprint DROP CONSTRAINT fkl586vm6j71b8e4yyq4460b8vm;
       public          postgres    false    291    320    3959            %           2606    188627 #   fichier fkmgjb8d9ulq1ner1ragwiass6q    FK CONSTRAINT     �   ALTER TABLE ONLY public.fichier
    ADD CONSTRAINT fkmgjb8d9ulq1ner1ragwiass6q FOREIGN KEY (id_projet) REFERENCES public.projet(id_projet);
 M   ALTER TABLE ONLY public.fichier DROP CONSTRAINT fkmgjb8d9ulq1ner1ragwiass6q;
       public          postgres    false    4015    316    332            &           2606    188632 #   fichier fkmnlvsoka9lbd6yrcfihjsyq28    FK CONSTRAINT     �   ALTER TABLE ONLY public.fichier
    ADD CONSTRAINT fkmnlvsoka9lbd6yrcfihjsyq28 FOREIGN KEY (id_user) REFERENCES public.user_entity(id);
 M   ALTER TABLE ONLY public.fichier DROP CONSTRAINT fkmnlvsoka9lbd6yrcfihjsyq28;
       public          postgres    false    3959    291    332                       2606    180261 %   soustache fkoxrm4fohq1xjth1he9l4rsg0y    FK CONSTRAINT     �   ALTER TABLE ONLY public.soustache
    ADD CONSTRAINT fkoxrm4fohq1xjth1he9l4rsg0y FOREIGN KEY (id_sprint) REFERENCES public.sprint(id_sprint);
 O   ALTER TABLE ONLY public.soustache DROP CONSTRAINT fkoxrm4fohq1xjth1he9l4rsg0y;
       public          postgres    false    318    320    4021            #           2606    180296 !   tache fkqxh7b5cymmsrk2wm3xwnba0ps    FK CONSTRAINT     �   ALTER TABLE ONLY public.tache
    ADD CONSTRAINT fkqxh7b5cymmsrk2wm3xwnba0ps FOREIGN KEY (id_rapporteur) REFERENCES public.user_entity(id);
 K   ALTER TABLE ONLY public.tache DROP CONSTRAINT fkqxh7b5cymmsrk2wm3xwnba0ps;
       public          postgres    false    322    3959    291            �      x������ � �      �      x������ � �      �      x��Z[r9����;��c�W+���]��%�$W��~��qS��)�H!;3A��y 3E�y�$��Ғ�z����#��&>���I~<������z�&�zwJ�C��8�]����]=��w�p"Z���������:Z# �j�Fj.
�Ե�X�s���7���C��)�#�.nKS��+'ǜɷ�fN�.��z�p������_����鼾��p{���~�ji�H��/Do�c5�|�j�%�/�`��O�^8N���Ďk	IU�F]q[E�.+�#7�$F��L��@���+����׻������}{7ݺ�����C!��i�F�����.e��Q�'�sk�}
� ;䇓�QJ�e~r�yq�/BA�Is��Qm�����
�Ԝ&��K���fK�7�����F�n�@�߬�/?PO�;r�-̔���%�4�$�g�OY÷1�s�o��2~0�e�sL�-v�#f�^ivG�y%n1��\��˝�<������}>���Rz��Sb<{q��4��֪\�~��T):�%�:Ё�N�>Km����>�b��S	�B��t��<���\��¾�Šs�5Ta�2\���<�	��gRm�k*y��D:J,�����H��<�����;rw�>��>O	��RE\<�Uqy���P�}������i���UE�r.��뚽��Nw�����Nl�8�/���9���	 Ȟ�:��kV�ڦ�Ǫ{8_�W�6H�f�ŉt�ע�g���Y�8��3��4�`������ӛ����N���Vw(�.+~u9+��zbrvm��@xqE< d�6+w���+v>><]�O�ueI��T�_�tE.Zb~�H��S���{Ke*8gyd�Ɯ<�/�\�e$�o��,����C>>����uT�lp]��t���
�߸9h9���;�M��{7����?�Sx?[\	}�![PB� Z⢴0zY���D @�[Ɨ Rp(��Zl�(��/��or���q/
.�Pz���[S48�A�d�P�����A�`�x��>TU��N9�>=
|�!%�)��C1����z����4�������z�M�/��ӱ��SX�:A���E!p[;�� �
��֡`QZ\ -P:�*�0�DlK%���d��8�Z�t��B�M �/��*�zJe5�^��ܽ���Q�B��N$�#Iu6�c'/�:��+��Ji�`pS�h8	��])�_�\��߿?�bk�kA�[�ꦃq� v��$���fk�yQ�-s⑫i��(K�q[YDc��r{�e�>��=7Z1�Sl%
`�4R�����lH���ֿ�x�9f�!1<�T� �| ѫ2Qd�|�����5�iF= ���T��i��
�c^P��L����L?`�k�W*��*6������h�3�J��q֜dmg���Q����Pn�u�"+�j���l�|Fgw�܏����xNѡ�/%�F�1Du%\^$��E�B����X���M�Y.�dτ�� ��唡k�P�}��bKQ[��b���dS�X�^���d�q1J�(� I�Z��e�t�z���"��o���͟ς�H��%p+d���$��8��W_�B�W�q0ƶ���g�f�
�<s�F�i�0i��cx�N([<��4rd��Y���Q��K����	�C�v�,W�kq�+ }�M���� ڞR�gFy�������(@צ`��@�i���ۓ�,c;uO�w��2�Qຆ;���*�l�l��l�Eܝ���@k�� ih�!*:��\���P�G_2P{pLfVa]�֪�Ok��7Ƌ+[~2U8�"L-!6��v���ܥ�/��1��^��[%���ڐ�?5��]P Jm�H8c�=�`B����`�����r=�E6�r�WeB�-4mo�+��f�>�g�Q��%�^�.�P��N7|�B3�ں�4oǟ���@I B��`��д�`#�&�g[��+��4a��@VT��\e�J��v�����yL�2�\�C����*%%_�+J�8C�+�)���0e��^VH�2�+�;c+�ŕ���'j���P�9B̠pe+ܫ ��vK���6�����t\�M�^����Cv;f(l��bE[0H�|�J�-�.��.��x�!l��+������������?����`�N��a6O�0�����4Fg����=β�G�3����'X0��'uh6�1�>���@"`Ɏ$F�*B����@�2r��������ܥ��	�!�moi!9�O�VL��^;��Ws��l�b��Dh�2d$(Y��R���XA����H۸-�� ���Ǡ��մ}V6޿>��&^�C`D�.fh�^��J�G���-�P���Ia�iK��cmwV�ת����q(�#]��hzx�j�߀U�H��A�$cn21�O���8
mn)y:�\��^~E��E
�K\\M%����{��k�:d�$�Ʒ�����m��}�U��D.!���m`)�ϟ>�g߻U@w�<2ɼ�	�R͚�盇�W[M#�i��ъqM�`�1	#����x�|f��Hq���I��Q�L��-����P��i8\�
��f�f��0�h�� �5��w���&d��4zA@��4����C�w�R��,0�8*�)���W҇璉�y ���gpq���B��@x#�9 {�p*�YR(r�� �e2���r��P�<z�b3����(>��'�P���p�`���Y�P�6��'n�D��Q>����h�Y�~>�[㡸�)y�,f�	���u��W��!��8o3���f	�8sRE�B.�l+j���r���C���?��ˉ��P+.㲈�5�ȊF)
���e��������c���	?(� ���Vڠ�2�;�������C��n	�@��
�f�"�Yo��jz�`���Dr�3���؈����qz����R�A�����032��4%Z�AK�!/��Ǣ�&髌��g�i
b2�S�=�wa�H��yzLD3�P�^��a�l�Ú��:+�
W��&X������Úiٴ�C�}(�b��#���ikP`1�)UP�\��x�^��^*D�� �I����P��aȗ��3[ߣ�#�:\��+�D4�}tR֚s��	~g� *I���$�PЄ�<<�jXJ�Am�����/���Q4²/"��z	��:ۤ�s����o�����j�y&�i�l�^�^�x3m�L�PG�,Z*�h��+��'Fxw>ϕ_��w�#��GT`#�ɀ���2��̥'�����f5��Q�����eF݇p5���m9H.�5�}3��
��]�pp-����<�w�A��S�TF�fxH�K7�u��݂� v.<3t$ZǊ6"g�Oyz��J�����X*$g�����`o`�~ �j��dIj���tV�ڐ�-	CԉG����K������Byl�����e�|WO6;����K��d����=`�5B�4M6�xN��,~��#�v������l�r��ۜM+�4�b��n�E�rP#�,��"ʒqC7�>)z�h��&�IE͓���
��T��[�O^��Sޙ���w(�~:�P`�[�����2۸���z��e�`���X5ٵ��M&�|�ͲƪhWh"6ݝ"�~/�Ć��FF�Er���b�� �H�}]���}4S�Z�0,I��ɡ�T����C�����6Ntէ��+�V�׾��U�EM��4d���6��*潃x���n����1 ЂT8P��	�c�-N� [Zo����? ���\�  �(��Dh�n�_:4]�i���iv�����d�t�OfIz��<NϾM��j���A<�[��>�
G�T���%��������O>A:m��\ �J
��{«	s��D46���t��"�C}�}���w���Ef.��5l��a����ջ�	V�U��i�m4�E�%�/�^��5��مi4I�ֿ6u���� �5+�w��
|����[���z{0�5�
O�������٫��H](�t

�%������ 6   ��^M�?u7���
�̭�N+�%r�!�jy��N{o�}0䅊��_WWW�qr��      �   �  x��X�r�6|��`8�_��N\�){�d��j����R���13r,ٚ�[�+O$1�O�>m�	��d��h�S̙��uF�Lj���z����Pe�j=�iKZ�y.Ҳ�w�2�6����쭮�NIg�/�Z&.�J�������2����tAO�eZ��y[��y�di���aݾ"۽��3�5,G�xo��(^rE�17ɃU֦��4�x�g?�S{�i����vx�y�:�J��b����a��#���\�[�A����T�9�R'i-7�-�V'����X�Cżee��4�ÛK�^���M}����j[����޽�y�#p����n��sl��j���d�^������P�5�$���&I�Iz⭙�\�)�0l�t\��~���n���ً`E����7�&�Rƞ1�q��P����ό����-j��h͝i��yp�q�*ٷڂ�\�� ��C�,����Z�]u����C�������3��������[Vو��$0���<cQQR9�C_���l��T�����`�y}����9y���_��|��}��*Q*#�'
Iɍx����R��+�X����2�A�Ǣ\����?���4B�O�jn4d&�@Y)�M�B\���2H�9��̧�4</}����&��f��ƮG�͸��z�.��{< ���W���]��� b7�g3N�(@���7�)�9����T�yǅWP`��X�A�uΤ���N�=4@�/����m�Ah��0��}�3.m֮�����2�tRĻNp��R�W'L�Re�u�j�!��v�燽Ư�Ҏ&u>pjK����C�@�]�q���A����;L ��d���]&���W�A6��v<*j��&#h8����vl�T�/w|~E��u�>��J���@�S�	i3���,
i29������'@�|�������ܾ4�P"���a�CGL"r4
*�y�-�>%��jN�X��rcW2%ϹJNΦ���9�L�0*�û������-{����=��˫���4	����֫y,�r�e�����\�F��\��x�;hѮ�?�'K�i������/�>���z�u9pcJ��`�UgD������;�,m64����'��S�w_x��&�T_���~����ɻrF���X�AF	V#̉�<x��t�%c ���{3�9�˽�C=��*�]�ZW4Rr��t�T��P�2��3-������q.�Rd�~��ug����By�/��Т}k�4Y�i��Bhvh�����P>�Tj}D�y,�lH-��*A��
�O޸��+���<��RS���`nQhޤ���PE�_�ۂCf�b(N#�x����#B��ZX�?3���_-�L������S��a��*�	�����E�ҜU��dLi58R�~�����#�ңu%Ʌ=��nfIq�?[zU�����QT]���
�3���%}k�V��!����B�m�����p�X)��w��F��J�/dS�%�X�j��j��
n�.$7)���okV��nA��W��Zv���(�L����e=�������F���J��xK-((���ظ��@��#|��I�x��羴`(��z�z,�|����hb� L��P��e���=%rh���\#�_C���'zK���WZ�c����2@�����M^V�s1�ȷ0��b�ŧ�qʁM����W`|pƁ�:��ȶ�h+�6G)�?B�H^��.Z9r�A��5���gO�<��y�      �   �   x�}�AN�0@�us�^��q�8=�@9��"Ai��>݂���z�)�&�Eh���b�@�2��4.u���1�����u߬�N�r�:�Մ���� ��(���5d�S*����ޯ:~]J��Z�b���A3�y���p<�q�}��W��>5&��2��U�(�cZ���x�<9�J�Y�      �   �   x���Kn�  �ur#�	&w�ƀ!e�2��;��s���=Jt���!ԍ!�T+��V	[Ym�v��Y��]�)�_Fۘ�9�ѮUKD� �!{H���텊Ol�s�2����[�9���Of�e�!G����k͙�2y�)$�A� �Pժ���?���1� ���`�A"����Bi��σ_f]�_��i'      �      x������ � �      �   �  x���=o�G�g�St���^xoc�t�P�[��䑩P[*$y(�|�R��@��2RH�	��G�w�,5'2H54@�<�@g$j1r]�uK���`�ts�
+[�iA#�9p�̾ш���.�z������������c��Vr����*;],N�ò֮b�f3WX�Ymd�5�ȣ�XӲ�D�w���I��P$�+��-�4�Fns������'=����n~.{��n�d�٨�Cx���ý��'q��Dw��~�������(�VuLL��
X�Si��R5�1D�c:z�ooԽV���<�� �9�8O(eN,1R���=8�0�ЦY��9�<�8{�QSҨ2ڲ�wۿ]��9e�RG��@�JȚ,�J� ^�i���Z�$)�I3�W��D�;��1��,��v�ÿ@�v��*7��H�ȡ�%W�A뤌�r�����!5�日�y	���/�EϤh����1�Z���	g�F��T�'/7�%ȡ�=�cV)n�T$�*fvi��xx!QGWs���V�@K��*�����ӄ�����tXo7�}��n��v���-��Uf��J��Z�Y_������X)]���;J����40X���ŋJ��}�[��U�Ü���y�F�Ao�V�� *����α?v��6�����0R����#��j�.�J�ㄎqu�:})j�04��&:RE�/�:���\�66{+�6�.�&`��BH%Β�d�ds�9c;�+���z����8�Oo��+�7rڋ�ǀ���n\�e��w�����Ӎb��W�g�^�x�&Aȵ������pA,���O5Z�2d� ��
����2�O0��{���99�}(�^�R��lPZ%�1<���d=f��r'r��:}vK�������?K��g�ϐ[��|�SH9:�şFʎ�`�0����~g�}4��>x��7*.�/]��h��Ǔ�EzFΤN�؏wr�������k��b��q���{�ʎR��|uu��DY�      �   �  x���ˎ� E�ο�� ��lzےţHP0xxD�����ލ��{c��p���(`2���F�* g�G� ��n�&�����f�i�:|\��.@(�hNg��~��aP�i��$4#�i�Ԩ��� ��Q"�5���L$�I����3
ڗ!��,WdRV6rA$�=��Lj�0ڗ�A��4
C���0�v�(9�,X�l+��*4J��C O}��Zh��]4����I�������h�ֻ ��"�������Bkro��F�\<V��hv� KM�k ���)|��0�W���ܐ�B� �N���k��\d��� �-P��`�ֆ���Ƥar�ٙm���N�ꋻK_��=O�n��S��.G�}ř�����Ԧ��=�q�k���������Y�7��5�Wnuh��'q�x���7��7'���:��#<������e �9F8B>��t���      �      x������ � �      �   �   x����!��[~A�\�(����ܻ^5T�:�L'Q+�BQ�	��6t|�۵� +�'*�(�4���=0�H�����<�I&3m	Н�<l�v�e���	?�AM9Vʘ�s��^촲@R5(��������N�+�𤰜�t����}����~����K8      �      x������ � �      �      x������ � �      �   �  x���ێ�D���O�0*���	�Xq7H�:�l ��:������3�ifV��U��+�������,�ͣ��Ҡ�Л�-��r6�*2Oߕ�xۆ��x?����O?�߯���0�O�|�i��>���&][��)z����D�5rpF��gI]��~��n��ó�o�}�e<���խ��;'��IX�dJ����3 ��h��U���L�9�"��2��ՁsT� ����$�B��L�:O�*h����z"�8(�LCKF������x��PJUr�b ���0Ԃ�Ѫ'�{>���};�^��ؓ :��k=Y���U�$JR(K>��{՜~>ʺ?�1~�x�m<���#�O�_��r)^QN��'-�k����Sq6V�������״\�B���������krq��:5�	����O�ȡz�ͻ�~j��<������l}���?~���ƨ)��J��j�B�J���C!�%�?�v����ϯ�;���Z����MS(s���1���J�-ȍ�	61�+���R�PظR���o)�ԩ�h�W@���\����tu2g�oQ{��xkx����V�`�{MT� ��oQ{{L�6�Lx:fN
d
rw��"��r���N��X�Z��^��zQG3��&�o�g����5@�(��4����g�K"��C�d8�Wp}"���7j�Z�GG�{�������a�Һ���f���U-�p      �   �  x�����9����pKC�[iSe�܆�HĈ�}�q�,�}�����ܑ�t��9�C�x�zD��CKa�0zn���^n�o�2��ۉ�>\·~9/r��~9�t���_TOǳ|�]��~y���q���^~�n��.uT!�Fvj
�~Q�ZC�[���¯�ϗ�|:.�9qA��H���h�R����)���v���$�[���O߆���嫽�<>��H�b��u�$(��(������)��.�|<�ٚW�b]�J9B��tp &��:����f1M1�w�:]��V����#;�*L
���sv>NJ�c���
���<Y��Vl�<�"h1ڹT�(��l .T��jݲ5��߯����5ET>-���RF���;;�&�E
�[��º�)�O<���P �A�v�EA%�h#?�MS�w۹[�8Q�N� �W�z.7L=����<����*�s��COmZ� E\�!\����f�N1~%���K�``��1C�� ����x�7�x2��u����NG$���P�+�ayH��>�x*��U���b	�]��� բ�R�PC��9	�O&׼��.�wg�(�cU�ņiI�~0k�7{x��TrͫZ��+r"�P[4�?b�ug����*[��O%����O�(���ɇ��2V��˔{Li���6���}4��58�����s}���-0t�aU�N�)�{���a���O�6�      �   k  x���˱$9 ���>HB��E?,X�c�� o��R�J���oN�ږh.˳KJ'�6s/?M��T���C��&�k�i�M�+�����y�tI~�h�Ol�!���_�s�CY�F��LIWU�s����[����5�J㺗7�mg�֮.e�yO���AYw�^ˊ�=�2�P�;���s��9�NY��)�U)�n��4����zN�ع6��$�3W�W��/��ʶ��n�%+��ګ�iV�Z����d���xϖ���a��~��H�G�4��\��מ�ݜK.�uƵȂ�n�E�7�e�X����:}RVN�xM��`ݥ�j�k��X3���e���+�|:EsqVD.��@z���,���G��+}�\^ί�v�nJY��J-&��O�����{�h�9S�PmC���X�/Ă~!���_,^�/Ă~�~�B,�bA���X�/Ă~�x1���� �/Ă~!���_��B,�����_�^�B,�bA���X�/Ă~�x1���f�bA���X�/Ă~!�ŋ��X�/�%��f�[<mo�]Gu���(bAW��X�UĂ�"t���,^�UĢ��6���e3�$��.��^�-�~�1Kt��G<л���קy-Z{J�{(��Hr�~E���8����m%��e�՚Y(]z�e饘��I���έ�t�zG��1S\v�f�(�N���T#n�O-��zj;���`�3d�W�yj�۞JY�Gx���Ȏ��e�Z�}F�3�ko8�=�c�ZG���K�'�;뗯qZ﷦77f�4bVݒ����^���Tڬ��F�W|�1��ui�#��|�FQ�h�i�v��QV��ؓ��뛡�u��%]ۊ�JY�R9)za�_���X?�M�w-�����b�z%Q#^jE֌֘Ʈ/�ӻ9e-��UR��%X3���"�w[�9�<)�Fi��;�=������ɒ�S���{�w�"�M�B,�aQ���EX�/Ă~�����=􋱘_��B,�bA����X�/�G��@����X�/Ă~!􋱘_��byd~�{!􋱘_��B,�bA����X�/�G���_���B,�bA���X�/Ă~�<2��6G�\#�[6V�R���e{ZtE,�*c1W��X�UĂ�2s���,��տ~�̩o      �   r   x�˱1����<�$zq��_�?�`{��Cnn�݉��qs�|�Iw�H����فEQ8�l�V��ηP5"�b-����X��j��m�:$���~���Ķz�H��w��n�'�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �         �   x���1�0@��9E/��v�:�Y`�m�Ji�/
�X�����m��u�˲?j+���"Y�I��:T����a��q]����W��W���I�x�JO�%��B�:E������p�v
�,�����sg�� �o8�      �   �  x��W�n7}��B?0/��c��Ц�<(���^XҪ��4������:
�+�{���p���@r�D)o\f:,>w��u���q�%�3,��"���z}��e���z��KWx\�Mǻi��n���~�����ܯ�w����p�x@�]����w����J[�\ByR�U�RMj�ߍ����?ﺁ�L9���~9���8#X�Ex�,AlLm6�F:����n�Y},��W?u#��7��a���E������ [V��� ��cpN-����	r\��m��gK_��Ⓓ6��}�z�u���-�R��Ro6��/��C?��߬��~��������N�`��!�]�|BS�X#��� �8eMAm��G�'�S)�@��&��74�%I;G�5�!�Q��P��s��)V����M7r�+��T��jݠ�*Q�� �C��֚������Q�4�=`��P.Q��6Y��j�.���Tn��G����V�5�x8 �y�ø���%W_�z���;�_R�]eIs�Y��Q��J��
�7�W�[F�K� M+>ec�ED��b��2ْ{�����!�^du����)Ze����̼��킇(�������a�(�O��5��G	�5s�a[�/�Ul���9���vٚ���r�����m]�֊�K^�>������{@�h��2$�dt�!��P�O"�U�܏�>��ȟ�l9Ej���� �D�)e�rk1?+�3��Y��p�.�J��ؤ��_��D���	����E��_�jA_Z�"H�I�z��B�!i���/�4G��,�q���r�f΀^n�)˭&WP��2��ӳ\N��U�q�P��p+�$_��,�1$�ͫ��k��LmC�� he3�-$tl6�#U�K�k��̉���r�73"�|      �      x��zY��:��s�_14��E�C?ț�ɶ����U�eK����t�{�T���@e�2�d���bҗa()��p�+�'����Y�K��%H`�u�#�K�P.�M�xE8���S_�p���N�W���ٖ_��fh�u6�0�}��8�5BD4�Rb,�e$��&����S P�����k����=��)�
�m�k!���?\n^<�>��Uo��m},y� ���#���`y4�B�: ��ߋ�[{�z�b[�E���P���>��'�Vy�H�:P��_�
|����PΘ'��zC� �h���5޹ȯ���|��w}}�Y������^���]�?��#TF��Ci�oa�����ns�"�}G
���)sc�7�k��?�`�	K4�|%�U�
`���Ӂс�����4~-�/�@(���}z�0O8z>��ie��{w�ϕ�����cR2�0�=E��``��R:��U��Ȁ2�,��c[Z����!|Kmh��4������*a,�XM���<�1�-�����R�iFa�����q�1�B�$�����$����XÈ�9�a�͉�C$<*C�B���o�"?X���?�#�z����f�<ECMi� q4�_�2�}�y�
Oq��6F��Y1��S"�  ݬt��Pi`'B�B�KH�P����p
� ���R�%!���(��W~�0�N�ihȞRO�p�)�F,��2p.`^H�W	s.a�C`E�1�o��B�((F(?;�K@��yH�39��wD�w(b���r
ؑA�S ��� �9��<�4;J�� �B�Bk���VC+a,D0����F)`6��B�\$��;��1@)����N��(t�ۈ�� Li�_G��id��>���TD�"@a~ ؠ �p�1� �|�����h�,|��sO��1>�΅�A�`~a4�9�$�!@kD:�PS��\Y����ҡ�R��B����	�LTF��4���^7ǯ����0�@�>@�e��|r������������>0ʃ(��dŇ�2���T�PG0��	@P�Q 6�:����Յ�~�[�s��vtK�͎�����˅��^0+��x܌��[?NF�������y���뼺�Vo�8=i������j}:O��A�� @|#m$vB�^��b�)��D�A}|~�y�Q�y��(�Z}IA@��� �	�B��p�B��
C"��.L��g@�7�'��|�`�4R����u��I�?��1�)�Hr�&X���B���ÜT�og|�W۳����i�Y�E�z�6�k_�WeY���}/�:�=7<�+�t�J�H1nVj��:����l�����cn^�۹u�j��]�}����햼�p}ڴ����z�M��%�s�-7��4F�p��*�ˢ����=v��q�>S>\f��}��ŷU�/������D��iST�⴩�/�7'�X=��`'�x^/�!���&64��d���}?Ӫ�0=��Ʈwi֧���I��G�&��0^�Zx���&:�mVw��.]����a[�;KY��/���h�zc>:������w�q��쥝F�F�(�:��_��u��v��3:�k�L���1��v�ƭ��ّziRyE�#�W�Bī;����^G�����Z��q�7��d5m��O�M�\�]]��|co�Q�t��k<��Zk�g����٤߿��{I'M[�ϸޢ�"����Uz��Šuo�+�h֠�\���u�����2�G�g��t�1��T|��5[���ߦ��V�����0>v���^���מg$kČ�dP7d�K*�M_���q4�N�dM�\Ƈ�kv��`�Ӣ���\�N��_�:��asWT�V��'�ı�eX���am��ig����>���)W���ދ�_j���A��Z��j,�_Pe�*��WωXUO�i�כi%A���5E��$e�����޻�c�eˉ���s�[t�Ӈ���<j����A�����f���Eq���c�|/a.��.��;��n;�+|'vS��qg�8�߇b7��M��Ԩ9��W��Ȧ���fU
6kT���u�f]i�a�^o����ד��ŔW�rEu��NrZw��{��(�ݻ��rvC����<�.;���݈�O�Q[B�h���y�V��ۣ���tۉ�ݍr7ۛ�C�G�`��&A��;�p9�+7>4���ťE�1=w�qmuC�ϫ M�wWɂv�y�n6d�p���8���N�h?A�k�x�ԕ�� ����e�?��vW37IwX>�^-k'���� ��)�/� ?W���ͺ�A��b����3�歾E��q��a�ۻJ�Q�q�s��:烊���ju<M�au��v�����sp�;Yo�������i���$� P�f�"�w�#��]V{�T����/�U��hEy��ų����QGV��z����9�[Ku���zd�f�\Y~���3c� LX��u���"j����wZ�W�0��A�n��L�f�{����R���X_���s>��<J�ޜl�8y'�Eq��g�=�'�]q-/�īaM�o?|B���6�	�n�_�%xle�or�}�u[l�����]�G��^��F��bj����oc�@�(-[Q#')4�Uc���F�����^v�$��3i��T��t�X|~��/�{'X���F�5�I����O:
7�&ĝE�����z�'��ut}���G/p������z��Gkwy����ysq�ksJ�[���EEsxzNN�k�6��t�%�ᚽ��t��vex�����Gۜ�^t�j�t�K�~�?�v���I��q���yu�n�p��5/��x:=����J�H��n�^�Uu��<������ m�����������rP���[P��ݗ�Js�э^j�# ��$���LE��K�v�������T���W��&[�0�݇d�mu�<T�@�tl: �^�\�~��1?��Z$���b��z�&���Oɨ�o�n~���H�7�^��l�z Ҥ_K�Ծu�
�Z��_r�׎j٠}�Z��Y��픩���/��m
�7��£K�k=i�N�(��HF�>)��P?5��U�������䌺ګZKW2��x:3w��.���+�?O���RZo�n�8��H[hx��磹��]{�7Gi7z~��MP-Z�3�l��tb�on�ڻ�"͗:XO��Q����x]�f�9����=�k���4��H��b����-}T�e���p1�ݎ�פ����m�ٕ�� �SrA�1c����S���v�\�ZM�;�fm��R�Q�����Q�܂��kHa����*ꘛ/_p����ǩ��&ō9 ��%����B�w�w~{�S���oݘo�f?^ߢc�=�'�B��7�\xq!����s<����=}����W�nԛc����8����|�j_`�>jS!hH������qK��P{��'��	O2i=�'��2?�? 
�I�� ;�q�)-�������C~���Ň��{�#`�0�w�rI���>�qF��c�ԁY�`��aY�5V�В|ieC�P�gYEl�'v(���X�?��s��f����<M�~�?\K<��8����)�ucޙ���٫���h��tۣwr�E���Z=uu��T}f��1i)U��Y�����UG�Y}�%e�\�d��а�Xl`�N��e�]1��K�u�"X�:�u�.��V#!_�D�Ô=�	�y㵿�4:�S�T��2��h�z�x��Q?9���z�d�JVDz1���y^�ث
v���/f,��ẚ��x\	���v}[V��M��rZ�!m���҈.f�+q�����[�M�d{�uC���!�О�Q�q�_��A*;��j"���	Yy�MgW[��P�����{��u�5%O�}`G*�����!;�K����վ�d��W���%{���g���y[���;	�T�{6;������eϣ��Z ��R{f���Jwy+}�Yv��`T�H���a{��S]Η婃z���$����5�N��e�]=�d���\b����#��#��N29]Vrt����z����7j|Y=.4���z%�'�9>I 	  r]7����e�G)�6o���{F����51���w���v�*�ݭ2:y�
����S|�g�й4�M�����p�<�{�Ը��o�4h��(�^�L�ڴSK�QE=�.�7�.������]�#[O]������i.�4��W��{_�C���h�����k��ڣ�㕪R��0��K^y��A��)!�W�S}B���V6�p<�ሾ:Ͼ��[������9<g���;������ɚ͌,��d�s�5|Erʹ�ķܦ��*���s7��c�Yn�r���di���k�9����>Y���z�����V����u����-N�X4��+��e!:l����g�y�%z@���O�'j~ɪ��s��ݧ�K�sc��h���L����%��rz��մ�Ҁ�;����h�Q���|��땻�X���D�[��=���;�W�LNnq�On/���GG~�n3�v�F�i���^��fv7f�qec��ޚG�����\Ρ��k�Ӵ:�;������=f�	�O���nZ�w���T�l�24�Bq߶*�%�+�f�.�9�ؼ����k��oW��[<j�Pؼ3�̻9�Q���7[_z�h��n����5� ��7zV�>3���99Tz��%��/�7�����ɨ���`X{�W
ZN�Ip���Z �A���Րq5�l�qs�q�YM�����y�׬E}��a+t�r=�G�f����:��{?�Z9>�{弄?x��kM�݁���OvY�708���c�����}�BB	0�����?IN!l�w�r�N�Dq�!�����^�޲�!�>��Ç�B5��Y&�٣����x���!���%4N�#�&�Տ�(�������Fg�^�豺�'��}R��8�<�PuO��'��w�퍦�ְS�X��{�Ig�2=<��]]���3t����t�/k��8�Mt�zl�b�=D픔�j�M�ٜԇ�V�\���z���=1pKڻ�3S��\�FQ{��1�&bqO+�A#-1�_uT�I���T�������:t^�����c��'��0�.��]����yDO�(f�v(ѥ��W��^��xP��Ӟf�~�Z�<���ӛ����g�NI��Đ���aQ��ݕ�����W��ڌ�Z���/i�=�w����h��������n��z�?��.n��=���l׍'�~�ߢ�v��_*E�kx[�������N�[d)����z�5Nag��r�}?m+��>����1Q�I5�n��ꭖL9�ѵ1�/W�*�\�1k�pP1��Ek�[w�'�|d�f�'�Z6�Uuޝ��v>��m�����ye=3�k�u���<�W�a�%[�}���������!���:�����y�Q>=��@� [=����~;i�W1R�g��'ɺ�}owǃ��ya�ը�=�j��fT0a �?W;�5�# P��;���W(Az�0���+�=�)Ӂ3�	�O_������qan�l��)h5����3�&�F��q�S�X���J���^���$hv�ϕ�Px�p�Ii�g%L;c����Ǯh�9�琂Մ�$�^�cᇟ�R�`L3R���I��1�	�804�.���*�j�����?l�3�<)���8���!y��'�$��*O 8��
�{����x����s��s��|�@�	}�g���!j4��x.����7��!X9
_#�����o�FP
�ys�I,���!X�oK�#��)����sm�|�����9�)������������S鑀POHD=m�0X:��oI��s�q>�;y0��!#�iô�R+Gȷ���\Bb�=2hg���%�A ,��ލ�s#:�!m0���W!�y�$J
����/� ���Ct�CJPz0��ןsJ̸��<�tc�X�xY J/���PaB)`�������ßD��=�����!��4℃ą���n :W �1�� �;2�WO(:	L@�?.I���Y�J�B����b�E"ƟӀ�mb4������qP)�-��@�L$>�A�(f��!��l�N}[7����X! BD0h���p���
*�����⯷wB��,�p�tJf>5�~��~C�y&��	& �R��"���\��Ш�������}-Bh�?Sk2�=k,�>
����8�� ��V}��J�b�	��2��-D�>J5�(,�W+�fͽЂRjb�W�d@0(:�Q�
C;�Ͻ� dDB:�E!Q�	V��4��PJ������/N2�"}��3�ƀ�܂��!��M����~��� [n��      �   �  x��XA�C)\�܅)QP��lD��G�~s�"�+����	����P�$���I���Ⱦw���油��$S��n�XGx����ǕH���hJ~�q��&�ָ==��Z$=�j�t�t��I�a��/9�a�Z��F�$Fn$.��/%�m���&^�I#F����N}�az�F��6^�E�5��a�x$+P�v�Ѧ�<�<�Hv�{J���<˗m��g��f�E�E����u�}�E�N:{��7�XqI��)zEbk�}�jއ�ϗ��"��Վ^걄����"�!o�H�Q�t���kˁ�9zg��&`�Z+��.�f_�9
M�G���}����+Ӊ�ޭ�e��=�fƝ�x;��4A�򛻛�繴�H�{��E�g��/���񓙘ᡀH1�����Frx:2���5o�"
�rk�[�Dz����bj������55���q>��x���mu��W���*�S˩�ֻ6�hx^��t�N�~���t�����>t� ��4���acyK�;����Z�X��n�G��p�ez�f�%m��L�O^���iwxX��Rv�B҃��YY�)}�צx�"
8��e�������!{�zG0VqZbo_��z�6*�HGoMϊ#E�d(m��q
�΃18������� g6��4X��~u�|�X[/��2������nu�Ja.����U4_����H��M �1W&�� ��v�]i`�F�}~s�1m�����7�eQ����%9'8w�7�����k�s��ٹ�z�MK���e,�Q��{gw���Gr�(�Joc�"g~��aŨ]E�y;Y���}lC�+�IW�.3���v�`O��I�RM��0���B�>��0�W)T+�Zg�.p�;�;�3�������"�L�OZ��T|?��?�GY�x��~7�!��@�k��¹s�"�b\��Wb8^��W��k0x�L`�2������S)R�w'K�����L@sJ�qz@Ͷ�3awZ��E���?}kLઘ�d�E�/�vؘ��C �~ǻ�>��"��@�ȓ	����թa����x-RG��'�|���}� ��?�#�Z�ׁ� n�0����C����:�	[Ehߎ!��a��U����Z���;�n|j�E� ����Q �����	�DҥX_�����P�3�Ơ�x���= =Љ{ĺ�(�I���{
���l��2��|�/ۮEr��d����zs�^ʅ,h�b��x�b#���9�",�X�J��C�9�{^)�˧�0@���Osv ^���x���Z'�إ���u�X�J<����h�^���8��`�駩`�"27��w��9�ڀ'���J��*��)�H ��n?Ծ��ތ�[�ʘ�nW��ZN�H���'�j�H�:�S^�.���6���?�����`�ΊZ�-࿼ؤ�O���5�@*$6Ğ_z.������-77�}�g}�PG��!<FV����g���	'�JB�{�ѱ�X��Ӳ8G�`�f0Q`:p����M����C��kak��Z_1��$�7ܩ��ԇ�L�a'ŵ�W �������H���'�`�h�Y4�[?�>ݭ���̇<�6�l�K{����R$l`{)���v~�f}�d�-�نm��x�N�H��U��T�T���~���~��      �   ;  x���I��6������M]<�C�.� �u�)a�C��^S�ե�.�&R"������C���!`�c@)c@'D �h!R�9�����\���X�o�[�($S!TP�-��R�Pq�|C�1�)�D@�,������{��m\y�H�H�c;�Bבm{���凞df�p*E��.�G�
'� �=<K/e���ӢR�yW��l�nW��G�������Oo���~�}�s����~~��v���z^M���ݜ7ǃʆ�P{wvE������7�V��?�� �s��d�؜�{?s�w6��\+�����F��GM��@��$<�8�!g^�B�� "!T�	P&A�h�%��&�XH#�d�qF5c������ǣ�Mϗ��t���hSd�� ��Z��n��,#Z���n����~�\n����Ȋ�
͇S_���>~6�|֎�u�}-G_NVx�P%�
"�tH�vHR�A�H�Pg�!�	_�PH8�$T�����M�#A$��dg�i��F-��n�n��z�,(�톕���yuVN�y��u3ytY�잟�ς�f�ݒ���.8���i�[u�#٤s�]-h���͸��+~=Y�@Z��
���B$Ę�DX�ث��il\0F�tH�.$�9D�lH�?�r
��qv�Z����nu���x4`5���p��6�R^��ʲ��SԷ�s�sq�;�q��S>�o�u��˼�nV${RF��g�<�c��*n:�}9Y���9@��^\��C. ԜAưtZ����c"�P�x��+4�$�KN��,�D�'g/�:'��%m�Eo?�H�)3����I�e���K�\m����a�W;��`ԉk�B�"�[�"*E�5yq�z	���4G���hk�y��9�CK�1� Q2{�$&	�2���Y�G��pB�9�L��0W���,��쓪o�����r\T�Q�N�����ѩ��}D�U38G�ѵ]h�j5�lN�����/�v���:���zD��1sCn;�ޝ�_�����1�*��H����w��'kCIC�f�����a|線"߬AR��ua(�OS��rOq����#��Ib-~���@)~%K6����QL����Gv�O�h���W��[><<*���q�_n����ѩ��W�(6��{9_���S�/����,��6�UC�W�����$}}��k5V�>��Y�NC�P�,!����݀)�&!x��0
[�K,1iΟd$D"�	{%�w��;{ܯ��*[1K�vO���\e�u%M�ip�KV��ب/���c��W����ok��vPK���I�:����Y�w�ʸ�=�&���1ۯw������'�_W�      �      x��]{sZG����S��ߏ�ڪ�ٌ$P ���T��i3�@��$�O��A�i�/$e+��J*�E��������6�"��x�0W������q�Ù���ݗ��sX�m�s�u���l0�u�������/f�9\-?w��I��]_���C�����_0�j"8V.?���Q!�D�H���*���JF���bY�U0waf�Uxs��;2��?{���~o6�.�ǽ����d|:���M����`4���r:�Na�v���W9t|v>�g��Q���8���v�E�QA�����u�2�~����[�97�� 	�)�z���Io�9��$�+��\b�vBI�1�D��[ni�߅;s�u==V���R�	�ݶ.D1
VY��N`���yF�(��p׸V�J\L����f����p�<��h<�D�>?����d�i0�񾿼��^lƶBim��TgK��F�m��=�K���Q�0Dƨ�GM#¤X�� �"���i-��cZ���l�����o}�����ٌLj;��^x�7��_L+�I���`sV�mѝ4�!�s,UXf���4(�:
��2���OƳq|zy�7��v�����F7*h+���}���Bb�ݓ�0h��i�v��CT&­���&}\X{��Z[RR�!��T�����H�������6*8�� |�&i�����ƥ_���ߏ�ÆG7wy��TYQ-F�
��mCF�` �",e<H/��T��S�O�j0��᛻Z����S�4���z�|�R��bB��Zi�e�9�1����d9�����%�]t����b�.a�R`��	p����@�.���`!�c P��rɇ>��?����Ά�*��U#���0�"D����$�k �*��͉z�b��r:��.��K��ŗS�����q]�rv�,�1����Ө�&ꛓ�����ì�� õB
8��.bb�R�`8�$b��el��(���ŗq��Ƽ��Y�qlG��
�T�N�(pFme�ĩ�����*E�A��#ǌ#]��t�A��l���?z�u=�Q6��b4>>>��m"���]8�[�W�k��v��q������w�Q�;��<|Qz����l������*�"J�� ���۲�P�PpT;c%�.hD�ҧK҂������m%M��d��9���$��jL���$,FN)x���5�!�~ۨq��?���DC���=����q�|MhS�62:���y��.b4il6����7w���R|de��]Eb��j�56.p��>*��z�AL'�M�u�'�~2�8�r=��NnK���
�f�S�j���س�ٻ�d�aX��k�T�_?�_C�aq��G�ļF�Q �A꣪����ڂ36�(������VFS���$�	+:%��V�g����^���kQ�~:�ϷpO�b���_]���x��J��W��]�^���6�tH�]��X�G�=Ge�#��Yk��,(� ���=
��_�}4W�a[�����d8�p�-���>�~��N^s������	����~�B�6�~	�����;7fu���W��<���_�i����K����,XV�)�B>��/�6Ja<�&K+2���b��L>����O����Mvw��ۍ^������ժ��z	��Q+�%�AX*��:�c��r���m�`P�#^��)��w��GW
��H��N2&<�NF����8�lg�7\8Mt`r���@r~�߷\�C?lxw{��2iu�:j�%���J �xh�1�@h���<���� �Z$�۠M�w���ۑ�3�o7��O���B��v_���.ށ�=���`2�����s�Y�2;�]>EtR�bFej�"n��4*H�#EX���|/Y�69��X�E"��V!�H��2�Q4HQa>��Qұ��~���7��߇�ӆb�z��mQ6�]���P��v�7G-���!篘��TN�7��&�I�0�}���C ɴ��SRF�s�0H4��"��&@r�3��jC��jڗt�{��ۆ�.�݇,�g�]�\�.�l&f����ѻ�>M�������,�|�%H�{@���C� q&�,�ʻ��`&��j����"#�C�r`�%Ѥ,�����ޛ�V����pE���Z)%A�2���s���#
1_��"�	K����n2>yN���*<�GSk��O#����<w������
�M�L���C�!�� d	��QM\A9,�H�܉+�%�V8\J���r�C����>�������Š*�W?^�����Ԗ���v��5_��A{Ϥz��!H+�
�mq��4.r�+!��a�!���yVa1 �`I�F�Zy�����5����xv^�Ӄj���
F��A{Ϥz{3�Ed؜y�X�^r4���hĨ1���������>R�ߗޔP
Q�f,b�V�")��D.H��F���9����5.9�>t�b������-}�,W�]�����¬�__A|l����<0'�����A<��{�H�TA55I��`ڟ�SWζ�i�3i�CC����SݪU̲W,9x���U��(��KXu��}=��Z�Ь���a�i��N��x�2Հ$��	VX���j� tB��vn�on�������������_�����i�6�iF����I'Y���1�� �V�g�U��~��~�	:�W���Nz�W�?F4g�e��`�1AHl4"(���Z� �ʢQ�߁K|9�2֓�a5IP"^I.�����WF.��K��Ɓ'T�i1c��(�,Em7ɭ���lkh5�M"0� �ҌK`j�1�.� L��0� �ؓr�j��2@݉��%�6ㆷ��ڎK`J!�e���L�F�|T�A�N�_[��l7�����=n��~Br+;���t�&�ŋ�f�$�6 5�)b���)����t�oS�.+�lI�ĺ\K�(�:}|�U���<���᲌�j�H�k��s��>p\,Kf%�Hz�R:K c�"�!!����٧��E��8C,�g�����Ai=|�S�u@�+�(&u}Q��|�!mG�i�N�Zy���.�ǷlH蚥6�QMN
c^�l�@��c�.j��m�����<��-v�z���{K �IZ�;A�e�O�r�I���t"p�Ձ;�Yk�9LZ�`b���.���`2�4��ED�VQY$���!i��U�l�y��nJv���&)���K���n��{�Mn��[Lٸ��, ;�ez����>��p��e	 gDB�G�1��h��TWz��b�"��W�t������'�Z2�;}�-�Eo��t�_âsm~���߆�D�z�
���s��PN)�#&QB��q�9�G��^�i.�Kf���H<?G����L �V�����4Z�n���wڭO���~��o;w~�=K�vN�������jc�f�&���V�b����Eg.P`T+`R�k*���!I��f���{��mwܫ�W���1K��ٹ���rr�I��`�@�3�^�R`�<K��ဦ3�Y��y��Z��:��Hv/h��_`=�Z"��y���8M;M���(R��5��ȭ��T� 5�떽`�h������%(5"H�O��,/aJ���Gi5�`.3�H�*b���A�ɐLv����}1��S�u!x?^���w�+���q�tE�5R��m�GJ�Ri���pt4�o��)�~�L-��l^���7�8�\����:�޻���������R�t�"��X�����Q*'�0t�W�YV�z�49D%Q�%%�#.��:�E9��v� u��ĆXx-��E���O.>]|<�b<���^|�?S�O��ޖߓG~^_g>G%����o;0q.�[;���.	����y��4P�CRU����Yı^=��b��9�������z�z��ǿ��ܻ�Q�E�uo��ڞV��<N]z��f֤م.�Zz6����m=OVb�0�
���wd�@�!�"�qA�@�I`KTu}��L�.g���`vH/��٬�����Bij�(Ӛ��t�aL0����4: f  �Wd:��: �t}\�G�#�
Q���@�e���j͘���a��{�������A����,�4|�썽e�K����/柦M��h5ZT#���b#F�v�[�PB��R���x1N^��P�:�.�f\�%�^���/�6üMő�����ߣXR��k�� ��	ȧ�h�6N�8�Lj)�!42C��Q`E�i�k�s4í>��<Ǵ��x�e�Z6�wX�&G^	ڛ1"�<C@��u,�%���49**|͏C�������<}��&K��I��A�Uo�d���E3�D6
Q�$S�U�4>�1M˸�s��X������5R^�u��B����,:'pP�PܜJ�hl��}��R�Ԍ�D���T i)D޾O�:�3�8��"�-0� HU�3��oUvZ�g�ܮ��O��!gO�z��KS�X掳K�����܇�be����Z������8���;#���6j �$�p�kKt�:��IymN�����K�����x�����/a���*�'�'HFr�����\R��#�2�f8����.��zю� [j6�ڗהHx�,��hB���̰t]�g��t���>��oSOY~_�io�u���|ɇ�{�6H����\-oM�ӘGm4-�����0-�<�ɀ �	-d���D]���yM��0��c��ƭ��t|y����tx<���.��B�g�����H���g��I����<�(0b�`"%k����Q0\�%�)��i�F8g9��x�E��\��;��N8�&�/>w@�|X��!��,�m�E�z���(J������ 	[DD#�(u��B�*Y~M��Ʉ�&�V�t7b�S���7��X�=vY�p �kQȝ��-�� ӢN���fqI���������-Y��� ^i�d��Yc{��)'K�&�C`�����'�@J������m�W�,�oZ��կ:�"e����U��06�+�Vz䔃�ה�ڳ����h���^��G���s�<L���<�x��V%�!�o�zj��3����_G�B��O���ɐj��4$3�;vb}�c�����L��Q�L���3C�z�M����|�����͕��;5n\ݰ �����Bbt�]CF�u:WA46&�b���G�&�F����,�����ۙ/�"�6��&��������
G%!ψ�)p[f#���\ip��ݟJ�нCŇ��_�=���w:��5�6X��G`����;t"�����į/D2��:3D H��VG+��N`� ����]�t�o���q�M;���*=���k�i������d�l6�(�4��k�ߠh���
]k������/Vsp��R'�i�D� ��@�N����IC3�����Y3��'N�YǏ�����w7���7�(�9��֑nL��v �%<:j���;FE� ��%-͂n��Ү�n`x��SU��IJ# �abV��o"	���*���H�'� M�Z������H�L���B��hb�1�Ĭ5D[NU����&	�����en���k������^���_��e�Hi�����)�F���0��`�q�ʀٻ3���o����ﺹ67 ����Y͛/µ�b��u��So\3L+r���!*0��*Ѷ��� �� ��c��ɉ�qrr6�#.z�O?��-��҅��8���1?�>��N�>>U�3����~ť���'--�<i��{O�GV�t�����8��K{�`:�����l�_����ݭ����&���?�O�G��0�OGC�M?�w��Z�&�5ݹ��*'�6X��u�j������n�\t�6�R�Ҕ�cϷ< 4�Z��% :8�VI���^��x��~�t�_[����\�����������      �      x�3�L��".Cd�!����� �p�      �   �  x�e�]�A����h�Zj�t�\"�?�<lYߟȄ�]�if�����{����sIYָ�N	�s��찗�5�\�x���?u:���w�RcW�z��iA2���_-9mm`yJ��aq}*�m�F��vbq�y��$��G�v�����&-yt�2+��`j��2��6�m�/
?� �	3hb݀Ǻ�O�5�%������c6�c�`O$���f��Dцu�<0α�6��O�����j�A$�2Y�!::{Uޥ�|;�������B������<� �j�1��.U�g���|��Aզ
��Uݻ%7aE�T_<���� I��&���A�i-?{8p`�	�Y��i��3��_�	��*�l��Z:�t�i<	���ö�Z�|gɭ61]�[ڎHk3�=�)���'��hw�,Xqp_�����"\��*�\��n����C�c�
k��R�N	؄mʉL�o���z��g`��            x������ � �            x������ � �            x������ � �            x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      -   �   x���MK�@F��+�#���c^we�kAb�2���@�Ѣ�Ѷ�g��e��xY=���|?����&̗�*vg��?��r�%R�����źc���([[�M��W�l����K�:�#�t�ۋ�mΚ����)  ��BDT�.4�0�����
$�NUj�WI����^�Ά^��<��n�� O��i���!� ��Љ�~S��\"���t�Q��,Q$��.�s;���0?bɁ&      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   D   x�K1�LL5�4�56&Iƺ��&ƺ��I�Ii�I&IƦ���.���
���%��y�%@�+F��� }�      �   �  x��[Ir$�<W�CWȰ��N��ڬ- D�hå�ed#��]��2,�YL��LT%3=�@��*��n�j��`��d�O��N<F8\�ݽ������\�wW����������KH�rI�����iex�r'Ǳ����V�^~^^�qx=ze�1�h�p���6�3�Z���#F�)xV�͆�)N�ݔ�*wQ�Z:ܿ�}�������?�l�ⷯ_b�5�fx򆬪)�S��I�w�"��.�?�s���*0�����8̟�Jb��є���ѽ���Ý��=;/�Xl-��M�ޱb|2�+g�Kh�����ghO�Up5��%,g冕l�5�Gm�MR�N~{��q�
��![4��bH��j.lRc��{;��v1����w����7^����U�>a6�f�QqGWϦkuU;	qd~�����������	��g��BS�n"��P���Ie��P�&�$�@���y�ףUp.�l{ƷL�|��X�4h��5��a��\~=Z7���PCJ���p�+�j�!x&[]M�'8/�|:^�=WD5'/3m�Td�q|"NC�*>z�������Ggzdu�9��2z/I�H}gp��~�
��8햐�:��Pé�UlS�x�����٧�`Sg����ڙ��*!���BD��Z�����9^���t�Q�5�	�)�5%u�X%�G4/�s2\�؀/zɌ�j�d�q&��Vk�#�#��{���h�K��N�L��G��Ւ}M������Ïp��Upj���2"O���;�3�B���;p)���S�����	�X��Z�K�M�C��ť<���3�Mכ�h&�#�jb� hj�.��A���=�i�7ST��W6v�,w32�F���]q$��/4�׿޽����2X�C.� ���b��>�)���md�'�����E?2޳${��r�aˠs�e���*LJr���nG���=0;�}���:����B{�Gb�y�����4��j�<ˆgx��U�X�!&��<`���Ǟ��G��pȥܿJ���*@�>������r�� �#&��l�^�тt�*��г����^� A�����*��?�t��[�X���cGh��w����&���֐����7�O�d��QԦ����+����/����Z�w�x���UP�1Vr��|�ob��i�p>�`BH�yx��8���qj�n�p��ߨ�w���k��J� �SQ�ef�h�yRU��@k�_�X09L�;Q&v\ ;��%��xdv�g��(Q����>����褋���K�s��Tf���o���q��.B궞� ��_��EU����v6�"~���?	�ήdi{���l�2b%@Dp��̞L��?���p:�w�_�Z!������:r�`O[�k�>�w�Zi;�%[!�"��(�n �і��FavT4�_�����
A�4��B��P2>�'��[%���%[�UM����0���v S�$G��L��_�9����(�Af.@�4�m")|AH���I�d+�ٛ�1XcGD�8�P�|-e��8dun�l��s)&�c���4INƒ���>x��%[a{�-��p��PS�G�P�-�.�U2Z�l��k�P����&R(6�'R�C�"���%[�J�)�L� ���>,�!T���M9��K�d��i��6޹1�W45��VQqL��\�d3/�0R�3WLu�:[�P�)Z!�zZ�.��K6�N���L-�G�dڜ g�}�Dt���VM�!,Ɍ�iU��ZDm?�/�W�i�����O��i����]���f�t��ڹ���  ruq�Y]�$���a�C�{k��P�P��d@ɶ*� ?P׻���|"��D�7;v����<5&��j�?�ػ�yh��DT��@���n���Ժ{��\i�(n`R_-S>8��f�o��(��~u~��wl���`�l>�V�Yp��N�j�J�pEu�ޡi$5��6���Wԏ�-�a� �\{�[�X��ä2�6�*Ȝ 7�X=<v���Q���(�F��)�1QM��4������3�o�Rw]q
���p͔�ش�m��+��Gj|�
Y�\�й�Q��*�fV��Clv5��j�] G��_��B6e@�� r{o!��5e���2ar�lR�n�z�����V�A��[A����:�����K׌���*�U��j���èν��AQ+%N�4�.�h�}���w72r)`����6�{����/+�3�}_�Tx�S�C+��)�?%� S���gt�>�1{�����T�ia6��!m�0�)5#Ǡ��?�C=�ƥ�B+�|,�v;O n��fB.5���Dwmj�^ǀ+���"�O�<w��Q1������Ȉs:Q����̳;�� CyA�%04�o�J2=S���B����?w�m<��V3�ZE�B��X
�%B�����wA��g��J�� X��#�X��&��-���B�%S��$N��oso�O�0!Ҋi�';��ہ�>�	���� x$R�!'ǋ]�-ۏ[��i�	�Ö��w6��=V�H��Er?o��� ���m�v�znD+�%�>��x�����b�w:�e�,O�o�Pz�'͙��-���t��;t%�6��<�ɡ|�:2�6�	s�^y�F��}�z2�R�όyB$Pu�m��$�]��Sk���n��={sI��9-d�`P1��Z&*P4����?�ݯ�ϋ��[�����wIV9G
f��Cc���y�s�����ۻ̭�(���~z�2w�����
��_&��ڒ3���\\#�`^�-M����}�
	��R�CLa�'�*�]�y�5�����fh�ؙ$��D&���v؊U���?���w���yv�]0��밊P���! D5cq�'N���E��ڼ�����FH��馋�7ނ�1�'�JE��2_o���{Ndk�~�i@��%VKM�u�j0E�@�N��b͹w�p����������l(\�9D�JT�����;��Yk<�C����D �{/�=l}�o������o=�      �   %   x�K.�/��44�3�3�4433367174����� m         v   x���;�  �ٜ"pd� "蘥Y(�����Y�v��£��\����g�D#1jZ����Vgo¡4Lx}ڙS8@ʍbNh�jܼ)��Z���Jf���ϒF��U)���20      �      x��i��ؖ�?��W��ݹG�[0�!�	��j)�����0�P��ގ����H	�ҭ�B爃8o���Z��	�)�1�H̹D(�R���D��Q��X�s�j�,�$%J����b�Q	a�iBP����
ְ���˿���Mf$Mv����C�T;!�CU%����zL���?�����������oŁ�";�������C��~�ǿ�z�����{}<��"�{R�]��C��*�d�'�S�m���*�����혰�<�6KN��P}�?�?~�S}�N�gs����H������+���&��^���|w%�翼�SÚoQt�$B}��_A��m��ÍW�vXK^an��h=�h��u]U���w���d�xM�^��T]΃�/���L���w�6Z ��Ę~��r1~��������ǿA��U*�T�!��Ƹ$c(���(��F� �,A���.�?	���ޒ�gF��c�>A�0|�aaTlPM��кU!; �u��.�fw=)3 ����k���[���I�a�S�Up�f�Łg'�o��fc�g�PD��DR��^"@�c�H±� �8&	}� �"�ዠ�JtA���CX�i�E�b{��@˅q[��[ڦ���J?���p����pGГ2�R<.�r�����I��-�c=2�r!/������h1�ń(
�ԇ"UR��� �D�
N!H�@��E�O9������&_�ͱE����ć�u˽����[T-�Wzh.�9�
?(�AO���2.X�w�[�2yqN5����3����Խ�v�
�Lb0)#��R&Nb)�J*A�r�c��$+
$ʋ��rC����7��šu��{��� ��YYdL��l�s�c���ȵ��뎠'e�:����������ɢmO�<|�<��.�6�f7w_T��?�SF9O����X"="���,�$���
�	|� ���~&Ȯj�f��)�
���e�rm޲,*�ڇY���ͳ��m���ճ�ɣ��I?'3 h9o��y�v8�_��(�����z�*��J�N���O1(I4��)�D�}��Q���L�BI`�H�<F����%�q֟o�;￡9����L�'�$�Ym�� ظ���YP��}���i��8J�}D6�^��#��zRf�>'�}-7e4�%������6����./�.�\6���{>��P%
��Cq�K�i_��1�{nEN�1�������޺�o���\�nyB>��`�#�g�>�����c/cIXQP0f��[?'3 Hs�ws*]�aߤ��X$�\ߔ�V���T�/�v�B9^�?�a!d�4I�J��J$E��5(8쓝@�!��
}�AboR-	��]��.���U�V~�1h_͠�I�e�gV��/���k��q�L�zRf@P�����@������r�}h�dcM띫D��i�ԩx�Su@gr�􎺯ξ�5��8T�B#B�4V�C"(������<���]��X�&�^sNB�"Ѵ�m<�UvdV�$@~^�͝:���>�=)3�b�����K�I�/�v'�8�0��&�P��e+Nv�J���i+��5��ՙ*i@����H�*S��H��B�	�_�D�QR�ljf�̢�A~a��ę��(,�!�v^NgA����1�n���n����̀��r�������,Dt�k�j1^��H��>�Ggw�7{�� �!�qU������P�0R��R�$��<DP_۩��su�v=���ę�w�m���p���7��
c�_<��}��s�Y���d�1~szK��o��|�ާ>�i|t���x����neo�1 4�R��M��d�%MFB� ��Gi"�CihO�9��'e%��)�<��%i�9&��l,..��qe��^�ۨ����0��Ÿ���̀�����������BWSp-��D	�X"��(\�.5 ��J4�e���Z,MR)F�g����"a˯�c�Cz4�bm�'�g$ڛu�7(GG��X�_V�����q�޸8r������̀ K��êd�v���ܸ�j�(>��R_����~���i0���LF߽i��f���Irb��qke1D������H��"�*���ߋ���?3��7A%*>/�F9���yEM�?�i��;������Or���q�-�d-ȁ�U�W��hc<�v�8ަ&H�Z�E��|���D�(N$k �
W���~PO�J諚���*��i���l<�s�S�ܠ���l�E�n���9��~�+��w+�{�����홮p���l�+G�-�r3!���'=t]����}���&}�)Oz�P*�)���L���#a(k�?�K�ߙ �a�uW�Q�NO����	�؞u�ΛE��ET-3�,����ͳ���>%3 轍d/4g\Z��w�4N.H;�&'K�F��;	J �R,侤�"1�r��D��5a�L�(�@C�j�穆�<&���`������v�m��r9P��~![U���w�/���L����T�9�aO�Ҳ�6�����\+��N�dHl]��ո�ny��;��6�Ғ�+3�J�����U�'(MHz��Ə�*���~$h���Sڍ�+��N���kRL[ӯ;��iv
�S(m#�� ��A�zRf@mF���go�G�ۛ���8�C<&u*�ݭs�@��Gu�3A��HAJ"A���V�{��b��@�j��A#�r�?��J���lY5E�5�\��q] ,�m;/�9�^^�О�� �Fw=)3 �x۾��۾�jv�2I����d�a���r��~kA�8i�7�)N	P�1�=B�a��Ǔ��dZ�$�ԋ��b�_�e�8^m߄^�I��_6H�=�N�Р���ܯ͉�Y��n��s��d}l`��a�fz���܉��kk��:�H⸜�!�ε͟	B�4�r���D�ނ���%�B���#�U���~ޜ����5�Wb̦�6�Yg�h��1�o�~ћ} ]P;Ne�ל���zRf@P4��av3�Wo��9����;�%?m=u�0��4CY1������y�ÁiO�c���r������<�5���E�O�Ӗ��Mc��+���4ur%�l��	i�ۖ�u'u��K��*�m�3�AO����?3D4��%~����'�O��j����D(NA�ʒPY��R�*	��
E�x�S�_N�/zҸ^�Y��M�x��&�Qȫ���/�4לe�D�����m�b�Y�����s2����\<���;N7�S�Vd<��!�_�"_�+8�s���@1bq"1�>HK4I%���*K�
��5�A��a��v��,\t~�;I��md��T�7��,�gsf�V��S~�J����ȗ����AO��y���mK�~׽�����U�����S֬�2�}f�����v�)�y-F� �����j��	i��I��Q�m��Ϊ/�md�`����y�'�l9�s������c�t�<ocD����s2�����{kg��k۷|b�K��J�,�|����4g�`.��T�R�o?�;iJ%�*!���Dł���b
U5M}��	2�T����y����*���(��ʗ����,/�g���7���'e�ni&6��ʫ+����[u�d.˩xGU�%z��8ï�J(����i*Q�0�}q��m�)TS����u	�PS��~V��(s���>��9��X�~��<��lt���$#��g�'eI7�0��س:wG~�]X�-ͫ�1v�e~~�G��q!���'��}5�S��"�Tڻ#&C(�C���A���f�~��\�~����S�F<1Wl_��L+��\��C�ޙ_l��ev����b�q��e4j���mPk�FO��K\����R�b;��S���9h$�>�A��>H�R_�kj�@MQ��z��WO����Z��������ě��;���ly���.�i�[t��H&���\�9�A	�n/!�ͮ��Rg���5I�:�j}Lr�/۵5�r�>.& �R¿���Om�)EKe5�5�����U�ȫ�3Ay�e��o��g��-��E�ADET� �  am�9E6�'&2�[m�+w�ڥ�qO�s2�x�tk��x�X������G��mN�F����k�������0�0����YLƱ��JJ�������j1S@^���;� �!ZΝ���奯v�`^�B\7NIW�������wvhG��_DؗH�ޟ�~Rf��I�&�z!KqǛ	[� ����4\��h�O��d1�ŀȚ,�T�	Rp*���(!2��1�� �P���b��b�oˍU��>�PV,6U��7Q%�h�μ֟5'��k��<�@��<z�
q��'e���M��Ϗ��a
��ʾx�ybak�����'K��èD9V �ߓ2��5�I��E� 1�7GX�cJQ��� ��$Ҹ�'�Ҟ1/'n�m����� fp�e~�s��x��,����=A���%g�0{%e��uisȑboB�W� u�z�Ru0k% ���Ie�I�`,1��d�  +1�������+��H����8/���F̲��'�[�8z�Ga<�u�6��j��ػ	����t��#�I���ʒ,n�7�}����7^�����0�E',>����B��cb��!MVR��~x!�r�DJS�P�p�9����s��Nb�]}��uC����vjy��j=؛g.WW�_�m���Gyh�s<'3 ȗM=��O�Y�6�k�����<�F�bS��A�O���ޫ�&Zf��g-�wF�K��<+@��R!�G�� ������=�yQY��7p��8[�9�M�d�+�x&h��7��Y�m�g3�'�2�.^���s2��-�-H��wk�ګ��e-��P{WE������?�l�_� ��a)0�c���T	��~�9��>r��� �^C?���w,���wpn��|�8���q�ۇ��BofQS���v������w�xRf@�5\'��k9/�[�ʓ�U�Ws��Bt��l�}Ʀz�'�9а��,���>H�Ē�1H�ZJ�#ՙ��k��G�l\L��Q�}���FLɹ7.�QfW[7��<��~z���n��ǡ�㹘F�^�����^��ʲ�#%\��t�ɫ��c|��m���W&o�!>.��+��N��G���{I*L�zd��qUN�1� S"�|��YPl���"�"㺞5�=�C�����W�y�~�;�ղ1��ia�����̀�ś���Ŕ?�(0n��N�P	IE�v�T3�vvk8�Y,�A��H�����[��>�7�Dň$x���(P^w��'��ר(�ޜ���W�)e����-*-_��<;�bT�Hdi.�zM0�ޟ�xRf�ct�t�<���}6��9Cs��o��a�~�~h�����! '��~�Q� *�Ky���վ�� �(|u�����/��Y�ǆ�a&f~��~M����#�`��j�V�'¢p�6�o#�ڛ���'e�g�uZj���t�ڸۢPd�}'�ю����y{s�KYY������������      �   %	  x��]o���=?�\o�����)�sl6�H�?,l�j�{���\$h"�*�!akNy̩�U���=-&�ʤ���:�DW��3�x'����Vqr�׬"pUX5�d��-��׫��O�]��p�y2nv~[�^>,�s��Z=X���|��U�r���^��T�O���iQ��Ǐ5_˫��E�H��a]=h�����������D�V?ɏZ=�m���w���׻{�ܓ;�ۃ˼����'�O������/����ӳ�ӧ�7�v��翼�]_�/�����m��t*�����n^;�MT�޾^�}�\��W����o^\>�����\���������~�"_��o�3���<����=�kp�����ǖ'������燯^>y�r}��ƿ��W�o���$b�����ޣw����i6��N�u	���eP�abV������1�Fno��j���2]��)��o��ǣ˄��{v�����&���9|��n ���A�������Ӵ����=>{��w���ʵ�pO����./ޜ|��>����=�&���Qyv�xVT2�Mi�� @gu � �I���v2ڗrU,D��,�2*J�"�L��A����/ � n�7P"�y�-ڜ�rR�6��6I�8���A����B� n�77{�L�	#�Ң`�-*�MR����p&J���@�=XZ ��PI��-Գ�f�5�Z+�AZ���� ,��
�$?\�!l��������ē����_?��2
��O����mB8_��SM��G6�����c<9:�//�My}���R�=���Ո`5N�����T\A�^E)Duu h���vj�t���0����f n"���I<�JZd�X
Pb5�����l)�A� ������&ys��BpD��X�:���iي�'�Y��w���v�:��S�F�[��z���Q�W�k��v���j�?H;Epav6v�<�]�"i�vqc���b�-�G6�5��=�����&y��B���jll�ꕶY�E��X}	�XcrĞ�����iƭ�CT�}"�č%�����Q���p*M8A� �`U��5m7���ƞ<����90a��]t��6��T�rI'h.�F�Zٻ 7��ͭ�J��আ�E͈�@���
�%U�C��yp�!C� S�=y�����N�e��5�*��RU����3�ֆ+Pf�p�%ys-Ԣ�&��X��V���h���6Xm��H�������C�'3P���l��b)��J�MQV!'l���	�c-T�'���aq��U�|ds��Mq��	u�JJ���Bl)/"fp��'o�4Pp
U�d�MA/6�7u�U&�|N�k��=��5RI����2�N�d��
)�D��l\��� p6��[~~f����W��>�$6>o���iT��W!iq�yS(�e���n٥�I�lp�T�ѫP��@m�t��
9Z��ZL5����{���XV�C�9��j���Xj��S���S��R�V�H�;�2�g赓���0��{���k�O9U] ����݌h��P�8�P�0:��_,� ���مm�QtfB�	c�B$	�P�b#�8Vb�ٍH˪�(@I��>aG,�7�R��bmu"hr�iVlkt �Ҏ�gڲ`E��z�P-)1Ԣ�����@K����Y�aܤ��	T�&���(�X�����������y��1����,@-��O����_&ڪRjMY���6�;�@<-3p���_*P���I��c?ɍ%����EİU�?� 
��P�����h���j�dqS?4Z �����}��,��� ���]/��, ���,� p
���I�d�2���ͫ� ��(Nڈ�f�̲.:�>ys[K�D'�]� lJ��b�b��.�E��`��l�{��2=�4�*Î���5�D�y/Z�QR�uS^��}jh�g��.�b�����U6Ы���T+ ���	@dE2�Z����/��F�)��"�D���c���lR���J]�T��,�fx��W��	G+P
�Ϸ��l������#Ee��Mu
�/F�O`GO�I����ɛo�����2���MZhF��\�\bi�Ѩ�	�y9~?�'O�7^��)�@��S��5\X�*���84S[��h��{�pkn�����&����]�j��'-Ժ$�>�U�,=v ���gO���p��Y�D��B��XI`�~؉Q1����tnf�Fʯ�q�=Ox�ȹ��3U�k�I+ן��O���2��N�`�i�i&'��o�����쉜��uZ�׸�o?O��w��ף      �      x������ � �         �  x���ώ�0���)x,ό��}�*�����B�IYm h���k��]H졒/����X�*�BA���
�P:�JQ���7���܊�'�v��}�G��2�ա�XS����Gk�K���ű�����3����� ��r� :(-9�/ ]��������;�q�=�	&,��X���y�	�M��P\B}z��y�@�L�ϤG���y��mAy����8�Ĵ�1{[�U�~���$�j�( IB��P��%��~gȯSd�|�����k�$����Ŷ�Q�C�V����)�L,58H`�]I��yb?7�����)	
��Fk����������q�<V�n��^R4����|��tr0A� ��i_��q���(^��>�qh�K>���.vK�d%yQ�o�MyZ
�Lh&!K�y-�ey-El�*����|��؎��N7�g�e��O��      %   }   x�e�M
1����.
���B	3_50M�M<�E2Hw�!}� ��ʐ���e�,\����!�o�,��X�/..������(x������IS�YiQk��C���]��X��uBx#D      �   $	  x��Y�n#�<7�B?PF�+�h�����%��r�0E
�4���;J����GAA��������C���]�L.�,��'��ih���l��y��:/�Os�<��Qݸ��s<m���y��c�����y�Z��9V�M�˾OGR��s�:3��}��'�:D��5��$��:>�e�N�!�o���8���''OO�c~��q�T��3u�GɎ��.�1ro=�R�NK����e���ֲԞ5x-��r�w�����(�����s��;~�e+9L�]Q�Ŋ/�4{�K��$`�C���4F���4G:����HZS���t�;����:��ѯ���g����� �>֐HC�!Fʉٲ�a���␁�4�]�͐6��������%�W�>���0���jP����,ѱ�挐�j�����<�+��Z�����1y�A�Q���>K�H��S��q�y�c�j�9ɳ:�I�A����|�|W)$�=:���\\/(���T��$�m��	i�c����*1�p��x Pp�����`/�礎<T]ɠ���;_�Y�����pO��w�0ȉ@[�:e0'�H.X��>&���6�����0�`U���ك�s#���%�f6hrJ��yV\� �T��}@9�R@��%��8�V�~�>���~��������"-�5UR/��T�n�����l�w�	u�洣's�U��֑��źJ{���X�@!�J�j ]KU��S�A1պ=?�T�<�o�f�%�iiE*ʹ����m�����$�!eU1�;�m~ ��V�+�q(����0�J����>i�B�Ry�+��O�z���wB�mb`��
���e:�8�Z��D��������W�ߢ�V\��p]�Hr�]hV�0�~���p�8 jH!��!�o��%�����M�j�yfF�յG #z��O*�PRi �՘c-J�<OW�	�,}��_@�f�͈��a̘�kA�x)�N9��-����|���Ui~2�� Q��[U�I��P"���.����h��9��	x�_hl�������7AY>8��� �|h�;Xt6��7���&��I�)� T*j:wt�X�<QI�c�MN��o�0�׻����x�N�s��
K���h*�G�
S`�����z.��Q-j6tZ�%.�J%��Aw�@��7H�f��s�&LUK�$s3�Y��K>�9,��1�*��%�m��A�e�x�<?��FwaP�9=�5��KrbQB0"��oU�m�B(3��3E��`=f���O�L`H�/�f^~�����C���c�&�w�@�,��Í��϶���P�d�֩zh1�p���=�\l�q�;/m��`�%U�𖫪^<w5W��,P�6Ӂ+A�OQ�-18Y���g���fw�PB��pA�Z6e(̆��FZ �W�7��](������R�Y��|iw�8�`��-�h�%uЬCfz�;���}�9?%��2�[L�.�x�|��R���P!��D����`wa�PO�@\F�#�>HJ�Ģa��C�8!"��Ku�H$Ph��)�v�	܅�Zϒ%� `�2�a^�|��P��7��]P{�{:�p`
�J����R�	L�f�/����oEX�cf&�i��a/`7��](r��#�O�C�T��A��&r�	��A����`��N��1F��]�n�q��
ZRX�Z-��`�g*��ot�	��S�eY����xʐ���h��E���&0	4)B� ��猐��d�w�@J�0b��\��# )�7�Tx�)7��]H��JȮ�ьs�\	/����?h�`���X�K��s�6�z�P���*$����$[���⹋%���Rx��uC�	��*���"F��a ������\7�a|'��jT~�	܅mؽ���ʺ}G��d�=�vpdr�	���N�!x��
��Sa8�2�!P��,��B��8$1A�7Y�@n6���t?hΠ��q��ūw-g]�3�0n6�;�$�A�	-y��*`� kY�9���J-$v5B���Z�M4J����~ wƊ1�P0 � ,I�B/�)h@z�	L�7&́y�auz�)�E�S���MV���U�=CbT�@���I���t��"p�͒t�o�b�	��{�PC������6�z����{v2�Yf���f-��j���WMP{R�9B��@2h��k�����E�=^ί`Η/8�P���W�W���e����ˣ�b�;�1^�qĺQ���!9�����.�ߟ�7#�L�,��Re�f0|_q�M��$���������g��<�t8�N$g�      �   �
  x���Mo#�����ȕ�?���䲇$�)�Q��UV�I�`俧ڞY�[�޷3��<���d����-_����[;��k�L�jJD��[{x������O��/��T�txy�~<:~�D����nC�-�~�� �Ү��v��x:��������<��z>�����t�܎�9v�r΢$��>�LE�|�U��:������aďt=����|w��//t�����~�ZOB�.�5��X��Y��՛�1p|�Dqp�D��&�nE,�		~VJT��5��̆�~���'Vh9�qۋo�����;���=O�u>�!ve"Sƫ*jKZ�DZ����0Y��n+T@x?\�J��J��@i�r�����M��&)r�NXm�H�����V���f4��j=��Ұ���08Rw�^j�]�:��%�m�P�bd��l,17%��~:�_N#�a�K�ap$�.��*#�ڄV�rւ�䠓��qRF��>����W |"�*ö�3
�3 �^Zo�K�Ͽ;�iVC��]�=y]��Ϗ��"L�N2X9e�����r���7��`p �.�gC�Xc�[��W���r�:s���^�n�J���!��Pno�;�q��qp��.�gC�X�������Q낈T�P=G]�6DnCc�w����Nc��Bch����7�ب�)�l��(R
I��B�%�d����N�]����@�=�����.�q�(��Lp����u�&�\H���0�����s��y�_����w�<�"�:k�3���i��+���ɮ��[G���M��al{y���Ì].Ϗ3p%^D���.j�d�zi9�;�����s��/||`�[^�ŋ�����c��j��ZX�E#N������[���^��W��Md��r"��h"����n��2������bR�)~FV��qt���/�t�7����B��Rd��Bd���ߙ�����j�TR�X^|�k�B��Jw�S�[�������ջ�v`����h��~��������|ltZ*^C��e;�2\3FN��&�U����ey�8%������/�q���t���������덎��\���i�+l�����ۥ�e<|��t�������p>-M|���`.B���u��=�o�?j�I��EԐǀ�9D����*�֎��?s����K�/p��=	G{����������+�7�խ�����"ۄS�"t�ԭ�gb��N܍�A�r`ￊ>��(+!��9U�6����
=%4'ɵ6kԷ���v�~��L��绺�6�/��/�_���\)h��<MN��R>G5�l�p���7�")����P���P|i��ۥ�oZ���xh�����^8hȕ�������Y��,1�D���-2Ve6�"_;�m/3"eD�˯�Oi¬�U�ac՚�H�J$�ӻ�TL)��g&Df&nm))�$E�/����iacU����,��.4�kMV����Z��� }?�c�6�_K��.G5�#/S���Ь�[[(�/�><��9�7Y�F�a�J�f��uy���p���pۋo�����W� v<�k�Y&�'��Α�F�/��cu<��u�6�W�p��BGe �� t,4I�2o�"'��l�1�Y��TP�X��!���1��J��@�N�I�c�#��3�"��.٦�L݅l�e��S��
���p��������y�@��ØZF���*Zd竨��X�q�4�����<3��љ!o�1@C��(=��+@O-1qu��(��v]�ҷ���1গm#08j���W�VnH7y9թ��UA��CwA�\��5�!|��7�<ׁ�ѹ���G:7���lɒ�S��:e�\D�.���+r+��>��Bch������+B�(����kq��$g��:E<������}��e��ZEv8<�A��H����7A�p&(%/ .E��Sy9�m�[@�jn|+`p+��<���Y�s�=r�x��%*��^�K���q�����p���2���ry�[��+Ǘ\3RJF�R9�$�D��Ț�*6����E |�ǀ[^h���3���9l��&E�R�̺a�K�ur�I֍��ɰ�[�}��e���:{�ϋ>])Kt��x���tTjEj��R4SݸY� ���6��I`pT�������[��IS^%ə_�"+^M��+���֋/��ǀ;�|�G��~/� |���8��';�FRL����lHR���1@��A4�� ��q����}���
��c�M��;�����E*B�ƣ�`�L�Z8�R(6S7[{>�o�1�������z�� �+Q����#����Op}��ÙV��=��]	>܍e��Q섽��c�FYk�5K���V�镀(rP�K��u%GE���5�ŭ��&��c��X;�I���*�2��ET��@�g�8/D�­�U x_4���)��阧�Ts�d�
�����V~�k������.w �?�1@�ʍ{-U�꼝�����<��R�&{�����5������88���� l�P�����������vAA��c�^mcA����-/
aptP����A!��(���~{���UN�J��1J�
�������u���ל$>�ΓN?�	G:��z��\p�R�i\��i�t��wa$�B��n�W��2b�4��
G�T;��_U!���A&��yް��4��%�������'�C��^�A��߽@���]��@�5�������e<��      �   �  x���=oU1����b'v>�P``��;�.E���s[PP���(~����t�?S˩�|,�/�%y�n��W���2n�|��x�!ሰ�r�ǹ-m��Ci�:,�
c�)�q��-�F����Y�������G�ʅF	{�� s-h��Tx�̦H�[$R
n��I�-��F�������;��*��MS��}�l�:�
�܁��0�QK�EWw�-���t+@�7�xa��mG���,ϖ̘'�$D.%����WS�mzK�jE>��O�o�߿^b���jڿp���6���+D�Jp�Q ��P%�a����h[��6!�³�j����<�nK�!l�0c���V�Hܭ;s����L�a8�]�G��L�i���BU�"$��(8�B)շ���Kr�Ju(TÀ݃�x#��fV��7	�x:E��\��M�,�7/��û�����Ό      �     x��V�r�0]��`�ɊB�i��@�4	�Ǣ3�,_��,�����59�!��H����&��/�d���Ja@h��I��3�� ��O'$ڀ�Lr���8N"D�I�!�`APHIO=&SD
(��	3M��������"��� �iE��xpڪ�V����T:[���fM�:mF��u�J�clN�U���t^��F1jƊ��t%�52��f�yU��[U&(�}pc�N��a�kIO�zRQX���
F�B"������'�㱂���H�k�S���`a~��?�)۸����}A��j��f����#�mP���idqܐ1a��<�V���69�l�g:�$y�.:_!�\����/&�N�g�Uʉ��'sZ�r*k�䦭#"n6����o��71�	Nkl�#Y<� R\W��_�v./���-���}i�n՝{�$.N�ڸm����u�����hs�b�Y��Y�bڰ7lh���h�޴d>�cZ�W��v�r4���=P��9���\V���i�q�d�f���M��df��^'63��*D]apv-����,!�l*��bu�T�ԛ����W��}��1�"I���I:҇
P�O�m1Ue�"�	�#��Q��DUBg���:L�4�Cen���G�������tJ��K�Y2���YY�`����+���\}�
g�և������X:ǚ�0���9L��D�	Z��$�0����h{]趯��첋i91w=-]Rߟ�qW��(�.���c������J�'#�c      �      x������ � �      �   �   x�U�A
1@ѵ�K$M�4=��$ip1
��\����6��\(�g�e�BEu���D��$=m�כEGR�(j)FF ��ƞ�-�|?����8{Y!eD �5K��|��&���Ҩkŀ�yA��P��
3�Y�0ݯ)�/[�6      �      x������ � �      �   .   x��M,.I-��J�/.���OO��K�rO-.��ϋ/�hR1z\\\ ��      �      x������ � �      �   1   x�+H,..�/J�,�1J�07��$��� ��{jqIf~^|	������ �'%      �      x������ � �      �      x������ � �      �     x���Kj1�י���C��\��(K�H`�)����M�X�B��B|���u� 15@�ͼ�s�k���a�i[.�|iۮ����o�}~�2i��ut�PZ���B�k�"?Ӆ���"�(	����"����D�����z�e�n��)�eb���8*��2E.�!��'���z}����'ͭu��
�'���|gu�i���[9�0'��mL)9�ʵi�{�o�U��R3uP��#� ı�b`s�p����</���n��x��c�'<=?N��5�      �      x������ � �      �   v  x����jA��w��/�������$N0��q�B���P�]|���+�i��NҲ,���>MT�!{�T=�\!F���M>k����n0^}�>��7�]�,����>.��}��ʦ�5��S����]Q�B�� W)���uJI2�Ɨ��`>����7�f�=�]�7�X���/	�]-�9�D������XS���\�>]�g��|:������.��7�w8�᧰�����r@�D�Z����9Dm��_�oo?�&�O����M>'����i��
b��3��Tv��'W�5���U���*/v��j�Lƞ{��Ū<g�4�X���0tUe �؊<��}$ө������~[6��:Eģ���z7�MG��(DlsTdC'ռ̝��M(�(X�TGlrY	�q���]s�p���G�^8Zl���Y�B�y�@^��1���vI���u�3���,���hہJ�%?� �7�Tk�~����[�>z�� K�bX�$uP��%;��/os|R�f�TI�D��: EN�$䈑�cĪޥ�U1GLK&��X�2��	��	��&�-I�����|���L��2h��R=\a�KjT�l������,F�NKSI�,:�=k��R���O��R��C۶� �&��      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   r   x���C!�����#���%~�_B2�J[��[��x�(�;���2��{r���� �!�R"�>�9[� u���d�u�΢���4��'B�o��؉�V�Y+��g��(�             x������ � �         �   x���1�0��9�"0��8&�R�NY�	- �
Uڹ���#;@���ei�j%�(�m-Ӽ�ex��>���y�kY�%o��>���1��sT�N@i �(�45,^�,��sP���|��C �͉b��ݯO_�i*����?�]]U��J�      '   }   x�e�M
1����.
���B	3_50M�M<�E2Hw�!}� ��ʐ���e�,\����!�o�,��X�/..������(x������IS�YiQk��C���]��X��uBx#D      !   �   x���1� ��z9��]\@n`�&)�TLL�p��8鬓�5������A25ID��5,�Q`�A��#�ϜJ�{����r�u�����4�u�|�䀹�O#��3aA4~,�Iī��Fq��W��Z�����o�C��� �HYR      )   }   x�e�M
1����.
���B	3_50M�M<�E2Hw�!}� ��ʐ���e�,\����!�o�,��X�/..������(x������IS�YiQk��C���]��X��uBx#D      #   �   x��ν
�@���)�6���r��"��ئ��&5	�4��Q,����H��Ȩ��3;��2��0�f���n(�f�����h�e��1���|��ƒy��2�,��	�2`_!b������'�<�)� y���٥>�fu���21�$�h(-�
��Q`~[yl7S�|QO�L����2�Z? $�W8      +   }   x�e�M
1����.
���B	3_50M�M<�E2Hw�!}� ��ʐ���e�,\����!�o�,��X�/..������(x������IS�YiQk��C���]��X��uBx#D            x������ � �            x������ � �            x������ � �         �  x�}�Mn1�דS�DI$�]�ꮋ���R�x��}�������D|��H��F�\�!�ءtꐒP�HE���}�8�^Ţ[�ر@v�AR�ܢ�6��x�]�2�0����&d� Qrp$稻s��O� d'3(m ��{@��3�rqd(*D?���sj��Ry��z(G=������}7�����M^�2�����,6��Dc����Zo#b��q�d<���%{AP_���z��l�3.�uWv�ս�Y�F�E����#D�R U�p��vYup�\*Ʈi���A�����G�Ǯ<���m	�#&!I����>j ���Q�4�ғ�(f����i$�&�J�[H!Q���gɮI�Zχ�VM78Eo<h�բ��A������EI���R�b�]���+����P����Uߧ>���Sw��i��d��_=T�1H�$� ��Xӈ����vil;pU��Gјr5��7oс,2�e�^�孰��T|<zh���c8�nޔC�F��i[6��~��ȅ˿���q�5j�������HY���G8���c/�vM혧�:���?���M�۷�\�����/���ޞr�ׅ��<�gwae�5HR@��y�&h��@a��˴}>�zx<͇����t՘�a�s�*%[��Kk�owww$��            x������ � �            x������ � �            x������ � �            x������ � �      	      x������ � �      
      x������ � �         1  x��X˕9;o��>�_.{l�ª2�a��o�UFB��2rF���Ŋ_�s���޺��{�S�)���}�-;�Yk������=�,��^�b�	�>F�[}��ʼ�א�f��7�W4j���֪R-�[�+��-�[�mQ��:��Zws���J�hmO�*�.O%��i�y��]����Ue���vx_w6����_]#��ݟx�*���jm���t+ONGl�G�<�Q8�q������Au�R^�s<�F>����5�����S���)|yis��x���YJ����7��Tni�uɝ�B���r��x�F�œ��X�䳺�F%�A��A��A�x����j5X�կ��܋�qz۬�$�'��A�xRݳ��eVX���e=|g�����'��D�D!Q<q�}�CA�ۅ�����Uʚ��G���-}�+g������V=3�Z��}[x�V�S���t�Hebh�nM���_���2��̳�J�<�~K�*�*(�Гi)-�ݔc�R&��L
iF�grm��x�O�����K����ދ�!�A�X�:��,�.=u9��A^��ޘ�� �wKԭ'�����j�3�S���ٯ���"��C�x���e/�ge��u ڏ�ENN�h��쵠�j ��u��������i�o#��.�f��q���<S�U�2����S4�&jES�g���2�xYk}�C��<�]�����9�m������]�;*�h͞��"�n�X�������r��n�G�dVi��p���[B�:�#�׾p�h�ԸB1�ȱ���`ev�Zu�{?�ҫ&<�4x�3��7�E�ʪ #�i�=�Wb9��[9-5
\���iS�r|�LY�xxAM�N��d��;�����l�������Sɾc���1�LA}��n�ݖRb�S7���o1�A:�!ߊ���m`�gԘ�̦؆��m}�?�6�R�C���3�LnS���M�B�6E
�b3��E�9�#�g�}J.���;G��K!Q��B�2�Dy&�D�;
��R�($��)$*�PHTV�V��+�m�X>=H�;kfP�_C�[v�O���-��(R
�o�q��c-�t�:���������~1���">ː���[L�a��i�\1�����w�B�vN��9$n�����IUG!Q�QH��r��q_
�r_�q_
�r_
�r_
�r_
��6($j+�����c<c͊8W��&�.��V껶��%�����c�����8�0ƹ\�0�%V�7.g2{0W���]u��3�q��T��;/����	_�
�|�+y��o=������B�lD            x������ � �            x������ � �            x������ � �         d   x�̹�0�X,ŞﱈK��	 ��`����Y��07%���Z�*N˛D��Pm�[�]`Ep�&��c[��j=n�������I�yf�z��g��o��     